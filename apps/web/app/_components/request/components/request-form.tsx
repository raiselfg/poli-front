'use client';

import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { toast } from '@workspace/ui/components/sonner';
import { Textarea } from '@workspace/ui/components/textarea';
import { submitRequest } from '../../../_lib/requests/request-action';
import type { RequestInput } from '../../../_lib/requests/request-schema';
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
    defaultValues: { name: '', phone: '+7', comment: '', consent: true },
  });
  const {
    errors: { name: nameError },
  } = useFormState({ control, name: 'name', exact: true });
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  async function onSubmit(values: RequestInput) {
    const body = new FormData();
    body.set('name', values.name);
    body.set('phone', values.phone);
    body.set('comment', values.comment);
    body.set('consent', String(values.consent));
    if (values.file !== undefined) body.set('file', values.file);
    try {
      const response = await submitRequest(body);
      if (response.ok) {
        reset();
        toast.success(response.message);
      } else {
        setSubmissionError(response.message);
      }
    } catch {
      setSubmissionError(
        'Не удалось отправить заявку. Попробуйте ещё раз или позвоните по номеру из раздела «Контакты».'
      );
    }
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        setSubmissionError(null);
        void handleSubmit(onSubmit)(event);
      }}
      className="rounded-[28px] border border-white/90 bg-[linear-gradient(145deg,#fff,#f7fcff)] p-7 shadow-[0_24px_60px_rgb(99_157_186_/_13%),0_4px_15px_rgb(99_157_186_/_6%),inset_0_1px_0_#fff] max-[700px]:p-[22px]"
    >
      <FieldSet className="min-w-0 gap-0">
        <FieldLegend className="mb-[24px] font-[650] tracking-[0.1em] text-[#587485] data-[variant=legend]:text-[10px] max-[700px]:mb-[30px]">
          ЗАЯВКА НА ИЗГОТОВЛЕНИЕ
        </FieldLegend>
        <FieldGroup className="gap-0">
          <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1 max-[900px]:gap-0">
            <Field className={requestFieldClassName}>
              <FieldLabel htmlFor="name">Ваше имя *</FieldLabel>
              <Input
                id="name"
                autoComplete="name"
                required
                aria-invalid={nameError !== undefined}
                aria-describedby={
                  nameError !== undefined ? 'name-error' : undefined
                }
                className={requestInputClassName}
                placeholder="Введите имя"
                {...register('name')}
              />
              <FieldError
                id="name-error"
                className="text-rose-700"
                errors={[nameError]}
              />
            </Field>
            <RequestPhoneField control={control} setValue={setValue} />
          </div>
          <Field className={requestFieldClassName}>
            <FieldLabel htmlFor="comment">Что нужно изготовить</FieldLabel>
            <Textarea
              id="comment"
              rows={3}
              placeholder="Например: втулка 40×60 мм, 10 шт."
              className={`${requestInputClassName} min-h-[94px]`}
              {...register('comment')}
            />
          </Field>
          <RequestFileField
            control={control}
            register={register}
            resetField={resetField}
            setFocus={setFocus}
          />
          <RequestConsentField control={control} />
        </FieldGroup>
      </FieldSet>
      <div className="mt-[35px] flex flex-col items-center gap-[14px]">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="h-[58px] w-full gap-5 rounded-full bg-[#326f91] px-5 text-white transition-colors duration-300 ease-in-out enabled:hover:bg-[#245b78] enabled:focus-visible:bg-[#245b78]"
        >
          {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}{' '}
          <ArrowUpRight
            size={17}
            aria-hidden="true"
            className="box-content rounded-full bg-white/10 p-1.5 transition-colors duration-300 group-enabled/button:group-hover/button:bg-white/25 group-enabled/button:group-focus-visible/button:bg-white/25 motion-safe:transition-[background-color,rotate] motion-safe:group-enabled/button:group-hover/button:rotate-45 motion-safe:group-enabled/button:group-focus-visible/button:rotate-45"
          />
        </Button>
        {submissionError !== null && (
          <FieldError className="max-w-[320px] text-center text-sm leading-[1.5] text-red-700">
            {submissionError}
          </FieldError>
        )}
      </div>
    </form>
  );
}
