'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@workspace/ui/components/field';
import { Textarea } from '@workspace/ui/components/textarea';
import { submitRequest } from '../../../_lib/requests/request-action';
import type { RequestInput } from '../../../_lib/requests/request-schema';
import { accentAction } from '../../landing-styles';
import { RequestConsentField } from './request-consent-field';
import {
  requestFieldClassName,
  requestInputClassName,
} from './request-field-styles';
import { RequestFileField } from './request-file-field';
import {
  resolveRequest,
  type RequestFormValues,
} from './request-form-resolver';
import { RequestNameField } from './request-name-field';
import { RequestPhoneField } from './request-phone-field';

export function RequestForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    setFocus,
    setValue,
    formState: { isSubmitting },
  } = useForm<RequestFormValues, undefined, RequestInput>({
    resolver: resolveRequest,
    reValidateMode: 'onChange',
    defaultValues: { name: '', phone: '+7', comment: '', consent: false },
  });
  const [submission, setSubmission] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  async function onSubmit(values: RequestInput) {
    const body = new FormData();
    body.set('name', values.name);
    body.set('phone', values.phone);
    body.set('comment', values.comment);
    body.set('consent', String(values.consent));
    if (values.file !== undefined) body.set('file', values.file);
    try {
      const response = await submitRequest(body);
      if (response.ok) reset();
      setSubmission(response);
    } catch {
      setSubmission({
        ok: false,
        message:
          'Не удалось отправить заявку. Попробуйте ещё раз или позвоните по номеру из раздела «Контакты».',
      });
    }
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        setSubmission(null);
        void handleSubmit(onSubmit)(event);
      }}
      className="rounded-panel border-line bg-surface text-ink min-w-0 border p-5 sm:p-8"
    >
      <FieldSet
        disabled={isSubmitting}
        className="min-w-0 gap-0 disabled:opacity-100"
      >
        <FieldLegend className="text-ink-muted mb-6 font-mono font-bold tracking-widest data-[variant=legend]:text-sm">
          ЗАЯВКА НА ИЗГОТОВЛЕНИЕ
        </FieldLegend>
        <FieldGroup className="gap-0">
          <div className="landing:grid-cols-2 landing:gap-4 grid">
            <RequestNameField control={control} register={register} />
            <RequestPhoneField control={control} setValue={setValue} />
          </div>
          <Field className={requestFieldClassName}>
            <FieldLabel htmlFor="comment">Что нужно изготовить</FieldLabel>
            <Textarea
              id="comment"
              rows={3}
              placeholder="Например: втулка 40×60 мм, 10 шт."
              className={`${requestInputClassName} min-h-24`}
              {...register('comment')}
            />
          </Field>
          <RequestFileField
            control={control}
            register={register}
            resetField={resetField}
            setFocus={setFocus}
          />
          <RequestConsentField control={control} disabled={isSubmitting} />
        </FieldGroup>
      </FieldSet>
      <div className="mt-6">
        <Button
          disabled={isSubmitting}
          type="submit"
          className={`${accentAction} h-submit disabled:bg-bg disabled:text-ink-muted w-full disabled:opacity-100`}
        >
          {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
          <ArrowUpRight aria-hidden="true" />
        </Button>
        {submission?.ok === false && (
          <FieldError
            role="alert"
            className="text-field-error mt-4 text-sm leading-relaxed"
          >
            {submission.message}
          </FieldError>
        )}
        <div role="status">
          {submission?.ok === true && (
            <p className="rounded-control border-line bg-bg mt-4 flex items-start gap-3 border p-4 font-medium">
              <Check className="size-5 shrink-0" aria-hidden="true" />
              {submission.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
