'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { submitRequest } from '../../../_lib/requests/request-action';
import { requestSchema } from '../../../_lib/requests/request-schema';

type FormValues = {
  name: string;
  phone: string;
  comment: string;
  file: FileList;
};
const field =
  'mb-7 flex flex-col gap-[10px] [&_label]:text-[12px] [&_label]:font-[650]';
const input =
  'h-auto min-h-[46px] rounded-none border-0 border-b border-[#c7dce5] bg-transparent px-0 py-3 text-[14px] shadow-none';

export function RequestForm() {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: '', phone: '', comment: '' },
  });
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  async function onSubmit(values: FormValues) {
    setMessage(null);
    clearErrors();
    const result = requestSchema.safeParse({
      ...values,
      file: values.file.item(0) ?? undefined,
    });
    if (!result.success) {
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0];
        if (
          fieldName === 'name' ||
          fieldName === 'phone' ||
          fieldName === 'comment' ||
          fieldName === 'file'
        )
          setError(fieldName, { message: issue.message });
      }
      return;
    }
    const body = new FormData();
    body.set('name', result.data.name);
    body.set('phone', result.data.phone);
    body.set('comment', result.data.comment);
    if (result.data.file !== undefined) body.set('file', result.data.file);
    try {
      const response = await submitRequest(body);
      setMessage({ ok: response.ok, text: response.message });
      if (response.ok) reset();
    } catch {
      setMessage({
        ok: false,
        text: 'Не удалось подтвердить отправку. Проверьте, получена ли заявка, прежде чем отправлять её повторно.',
      });
    }
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      className="rounded-[28px] border border-white/90 bg-[linear-gradient(145deg,#fff,#f7fcff)] p-7 shadow-[0_24px_60px_rgb(99_157_186_/_13%),0_4px_15px_rgb(99_157_186_/_6%),inset_0_1px_0_#fff] max-[700px]:p-[22px]"
    >
      <div className="mb-[45px] text-[10px] font-[650] tracking-[0.1em] text-[#587485] max-[700px]:mb-[30px]">
        ЗАЯВКА НА ИЗГОТОВЛЕНИЕ
      </div>
      <div className="grid grid-cols-2 gap-6 max-[700px]:grid-cols-1 max-[700px]:gap-0">
        <div className={field}>
          <Label htmlFor="name">Ваше имя *</Label>
          <Input
            id="name"
            autoComplete="name"
            required
            aria-invalid={errors.name !== undefined}
            aria-describedby={
              errors.name !== undefined ? 'name-error' : undefined
            }
            className={input}
            placeholder="Как к вам обращаться"
            {...register('name')}
          />
          {errors.name !== undefined && (
            <span id="name-error" className="text-sm text-red-700">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className={field}>
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={errors.phone !== undefined}
            aria-describedby={
              errors.phone !== undefined ? 'phone-error' : undefined
            }
            className={input}
            placeholder="+7"
            {...register('phone')}
          />
          {errors.phone !== undefined && (
            <span id="phone-error" className="text-sm text-red-700">
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>
      <div className={field}>
        <Label htmlFor="comment">Описание задачи</Label>
        <Textarea
          id="comment"
          rows={3}
          placeholder="Расскажите, что нужно изготовить"
          className={`${input} min-h-[94px]`}
          {...register('comment')}
        />
      </div>
      <div className={field}>
        <Label htmlFor="file">Чертёж, фото или ТЗ</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,.docx,.dwg,.dxf"
          aria-invalid={errors.file !== undefined}
          aria-describedby={
            errors.file !== undefined ? 'file-error' : 'file-help'
          }
          className={`${input} text-[12px] file:mr-[15px]`}
          {...register('file')}
        />
        <span id="file-help" className="text-[11px] text-[#668594]">
          Один файл до 10 МиБ: PDF, JPG, PNG, WEBP, DOCX, DWG или DXF
        </span>
        {errors.file !== undefined && (
          <span id="file-error" className="text-sm text-red-700">
            {errors.file.message}
          </span>
        )}
      </div>
      <div className="mt-[35px] flex items-center gap-[22px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[14px]">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="h-[58px] gap-[35px] rounded-full bg-[#326f91] px-5 text-white"
        >
          {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}{' '}
          <ArrowUpRight size={17} />
        </Button>
        {message !== null && (
          <p
            role={message.ok ? 'status' : 'alert'}
            className={`max-w-[230px] text-sm leading-[1.5] ${message.ok ? 'text-[#385e72]' : 'text-red-700'}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
