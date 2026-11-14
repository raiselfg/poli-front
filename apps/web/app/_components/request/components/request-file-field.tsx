import { useFormState, useWatch } from 'react-hook-form';
import { X } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { acceptedExtensions } from '../../../_lib/requests/request-schema';
import type { RequestFormMethods } from './request-form-resolver';
import { requestFieldClassName } from './request-field-styles';

const fileAccept = acceptedExtensions
  .map((extension) => `.${extension}`)
  .join(',');
const fileFormats = new Intl.ListFormat('ru', { type: 'disjunction' }).format(
  acceptedExtensions
    .filter((extension) => extension !== 'jpeg')
    .map((extension) => extension.toUpperCase())
);

export function RequestFileField({
  control,
  register,
  resetField,
  setFocus,
}: Pick<
  RequestFormMethods,
  'control' | 'register' | 'resetField' | 'setFocus'
>) {
  const {
    errors: { file: error },
    isSubmitting,
  } = useFormState({ control, name: 'file', exact: true });
  const selectedFile = useWatch({ control, name: 'file', exact: true })?.item(
    0
  );

  return (
    <Field className={requestFieldClassName}>
      <FieldLabel htmlFor="file">Чертёж, фото или ТЗ</FieldLabel>
      <FieldContent className="relative min-w-0">
        <Input
          id="file"
          type="file"
          accept={fileAccept}
          aria-invalid={error !== undefined}
          aria-describedby={
            error !== undefined ? 'file-help file-error' : 'file-help'
          }
          className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 file:cursor-pointer"
          {...register('file')}
        />
        <span
          aria-hidden="true"
          className="flex min-h-[46px] min-w-0 items-center gap-3 rounded-xl bg-[#f0f7fb] px-2.5 py-2 pr-11 text-[length:calc(12px*var(--text-scale))] peer-hover:bg-[#e7f3f9] peer-focus-visible:bg-[#e0f0f9] peer-aria-invalid:bg-rose-50 peer-aria-invalid:peer-focus-visible:bg-rose-100 motion-safe:transition-colors motion-safe:duration-150 forced-colors:peer-focus-visible:outline-2"
        >
          <span className="shrink-0 rounded-full bg-white/75 px-2 py-1 font-semibold">
            Выбрать файл
          </span>
          <span className="truncate">
            {selectedFile?.name ?? 'Файл не выбран'}
          </span>
        </span>
        {selectedFile != null && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Убрать файл из заявки"
            disabled={isSubmitting}
            className="absolute top-1/2 right-2 z-20 size-8 -translate-y-1/2 rounded-full text-[#36556a] hover:bg-[#dceff7]"
            onClick={() => {
              resetField('file');
              setFocus('file');
            }}
          >
            <X aria-hidden="true" />
          </Button>
        )}
      </FieldContent>
      <FieldDescription
        id="file-help"
        className="text-[length:calc(11px*var(--text-scale))] text-[#668594]"
      >
        Один файл до 10 МБ: {fileFormats}
      </FieldDescription>
      <FieldError id="file-error" className="text-rose-700" errors={[error]} />
    </Field>
  );
}
