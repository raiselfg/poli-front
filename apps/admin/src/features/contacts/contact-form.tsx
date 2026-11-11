import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/errors';
import { contactsSchema } from './schemas';
import {
  contactFormSchema,
  type ContactFormValues,
} from './contacts-form-schema';
import { contactFieldLabels } from './contacts-constants';

export function ContactForm({
  data,
}: {
  data: z.infer<typeof contactsSchema>;
}) {
  const client = useQueryClient();
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
    mutationFn: async (values: ContactFormValues) =>
      contactsSchema.parse(
        await api('/admin/contacts', {
          method: 'PATCH',
          body: {
            ...values,
            email: values.email || null,
            latitude: values.latitude.trim() || null,
            longitude: values.longitude.trim() || null,
            working_hours: values.working_hours || null,
            telegram_url: values.telegram_url || null,
            whatsapp_url: values.whatsapp_url || null,
          },
        })
      ),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Контакты сохранены');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
  return (
    <form
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
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
        disabled={mutation.isPending}
      >
        Сохранить
      </Button>
    </form>
  );
}
