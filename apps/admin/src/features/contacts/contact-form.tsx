import { zodResolver } from '@hookform/resolvers/zod';
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';
import { errorMessage, notifyError, notifyInvalidForm } from '@/lib/errors';
import { contactsQuery } from './data';
import { contactsSchema } from './schemas';
import {
  contactFormSchema,
  type ContactFormValues,
} from './contacts-form-schema';
import { contactFieldLabels } from './contacts-constants';

const saveErrorTitle = 'Не удалось сохранить контакты';

function contactBody(values: ContactFormValues) {
  return {
    ...values,
    email: values.email || null,
    latitude: values.latitude.trim() || null,
    longitude: values.longitude.trim() || null,
    working_hours: values.working_hours || null,
    telegram_url: values.telegram_url || null,
    whatsapp_url: values.whatsapp_url || null,
  };
}

export function ContactForm({
  data,
}: {
  data: z.infer<typeof contactsSchema>;
}) {
  const client = useQueryClient();
  const { queryKey } = contactsQuery;
  const saving = useIsMutating({ mutationKey: queryKey }) > 0;
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phone: data.phone,
      email: data.email ?? '',
      address: data.address,
      latitude: data.latitude?.toString() ?? '',
      longitude: data.longitude?.toString() ?? '',
      working_hours: data.working_hours ?? '',
      telegram_url: data.telegram_url ?? '',
      whatsapp_url: data.whatsapp_url ?? '',
    },
  });
  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: async (body: ReturnType<typeof contactBody>) =>
      contactsSchema.parse(
        await api('/admin/contacts', { method: 'PATCH', body })
      ),
    onMutate: async (body) => {
      await client.cancelQueries({ queryKey });
      const previous = client.getQueryData(queryKey);
      client.setQueryData(
        queryKey,
        (current) => current && { ...current, ...body }
      );
      return previous;
    },
    onSuccess: (saved) => {
      client.setQueryData(queryKey, saved);
      toast.success('Контакты сохранены');
    },
    onError: (error, _, previous) => {
      client.setQueryData(queryKey, previous);
      notifyError(saveErrorTitle, errorMessage(error));
    },
    onSettled: () => client.invalidateQueries({ queryKey }),
  });
  return (
    <form
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      onSubmit={form.handleSubmit(
        (values) => {
          if (!client.isMutating({ mutationKey: queryKey })) {
            mutation.mutate(contactBody(values));
          }
        },
        () => notifyInvalidForm(saveErrorTitle)
      )}
      noValidate
    >
      {(Object.keys(contactFieldLabels) as (keyof ContactFormValues)[]).map(
        (name) => (
          <Field key={name} data-invalid={!!form.formState.errors[name]}>
            <FieldLabel htmlFor={name}>
              {contactFieldLabels[name]}
              {(name === 'phone' || name === 'address') && (
                <span aria-hidden="true">*</span>
              )}
            </FieldLabel>
            <Input
              id={name}
              className="h-11"
              readOnly={saving}
              aria-required={name === 'phone' || name === 'address'}
              aria-invalid={!!form.formState.errors[name]}
              aria-describedby={
                form.formState.errors[name] ? `${name}-error` : undefined
              }
              {...form.register(name)}
            />
            <FieldError
              id={`${name}-error`}
              errors={[form.formState.errors[name]]}
            />
          </Field>
        )
      )}
      <Button
        type="submit"
        className="sm:col-span-2 sm:justify-self-start"
        disabled={saving}
      >
        {saving ? 'Сохранение…' : 'Сохранить'}
      </Button>
    </form>
  );
}
