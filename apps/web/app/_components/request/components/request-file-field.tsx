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
      <FieldContent className="min-w-0 flex-row items-center gap-2">
        <div className="request-file relative min-w-0 flex-1">
          <Input
            id="file"
            type="file"
            accept={fileAccept}
            aria-invalid={error !== undefined}
            aria-describedby={
              error !== undefined ? 'file-help file-error' : 'file-help'
            }
            className="peer absolute inset-0 size-full cursor-pointer opacity-0 file:cursor-pointer"
            {...register('file')}
          />
          <span
            aria-hidden="true"
            className="request-file-control rounded-control border-field-line bg-surface peer-hover:bg-bg peer-disabled:bg-bg peer-disabled:text-ink-muted peer-aria-invalid:border-field-error flex min-h-12 min-w-0 items-center gap-2 border px-2.5 py-2 text-sm"
          >
            <span className="rounded-chip bg-bg shrink-0 px-2 py-1 font-semibold">
              Выбрать файл
            </span>
            <span className="truncate">
              {selectedFile?.name ?? 'Файл не выбран'}
            </span>
          </span>
        </div>
        {selectedFile != null && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Убрать файл из заявки"
            disabled={isSubmitting}
            className="landing-control rounded-control border-field-line text-ink-muted hover:bg-line size-12 border transition-none"
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
        className="text-ink-muted font-mono text-xs"
      >
        Один файл до 10 МБ: {fileFormats}
      </FieldDescription>
      <FieldError
        id="file-error"
        className="text-field-error"
        errors={[error]}
      />
    </Field>
  );
}
