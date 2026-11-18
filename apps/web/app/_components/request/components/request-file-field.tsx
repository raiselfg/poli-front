import { useController, useFormState } from 'react-hook-form';
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
import {
  acceptedExtensions,
  maxFiles,
  requestFilesSchema,
} from '../../../_lib/requests/request-schema';
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
  setError,
  clearErrors,
  setFocus,
}: Pick<
  RequestFormMethods,
  'control' | 'setError' | 'clearErrors' | 'setFocus'
>) {
  const {
    field: { value: files, onChange, onBlur, name, ref: inputRef },
    fieldState: { error },
  } = useController({ control, name: 'files' });
  const { isSubmitting } = useFormState({ control });

  return (
    <Field className={requestFieldClassName}>
      <FieldLabel htmlFor="file">Чертёж, фото или ТЗ</FieldLabel>
      <FieldContent className="min-w-0 gap-2">
        <div className="request-file relative min-w-0 flex-1">
          <Input
            id="file"
            type="file"
            multiple
            accept={fileAccept}
            aria-invalid={error !== undefined}
            aria-describedby={
              error !== undefined ? 'file-help file-error' : 'file-help'
            }
            className="peer absolute inset-0 size-full cursor-pointer opacity-0 file:cursor-pointer"
            name={name}
            ref={inputRef}
            onBlur={onBlur}
            onChange={(event) => {
              const selected = Array.from(event.currentTarget.files ?? []);
              event.currentTarget.value = '';
              if (selected.length === 0) return;

              const result = requestFilesSchema.safeParse([
                ...files,
                ...selected,
              ]);
              if (!result.success) {
                setError('files', {
                  message: result.error.issues[0]?.message,
                  type: 'validate',
                });
                return;
              }
              clearErrors('files');
              onChange(result.data);
            }}
          />
          <span
            aria-hidden="true"
            className="request-file-control rounded-control border-field-line bg-surface peer-hover:bg-bg peer-disabled:bg-bg peer-disabled:text-ink-muted peer-aria-invalid:border-field-error pointer-events-none flex min-h-12 min-w-0 items-center gap-2 border px-2.5 py-2 text-sm"
          >
            <span className="rounded-chip bg-bg shrink-0 px-2 py-1 font-semibold">
              Добавить файлы
            </span>
            <span className="truncate">
              {files.length === 0
                ? 'Файлы не выбраны'
                : `${String(files.length)} из ${String(maxFiles)}`}
            </span>
          </span>
        </div>
        {files.length > 0 && (
          <ul aria-label="Прикреплённые файлы" className="min-w-0 space-y-1">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${String(index)}`}
                className="rounded-control border-field-line flex min-w-0 items-center gap-2 border pl-2.5 text-sm"
              >
                <span className="min-w-0 flex-1 truncate" title={file.name}>
                  {file.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Убрать файл ${file.name}`}
                  disabled={isSubmitting}
                  className="landing-control text-ink-muted hover:bg-line size-11 shrink-0 transition-none"
                  onClick={() => {
                    clearErrors('files');
                    onChange(
                      files.filter((_, position) => position !== index)
                    );
                    setFocus('files');
                  }}
                >
                  <X aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </FieldContent>
      <FieldDescription
        id="file-help"
        className="text-ink-muted font-mono text-xs"
      >
        До {maxFiles} файлов по 5 МБ. Форматы: {fileFormats}
      </FieldDescription>
      <FieldError
        id="file-error"
        className="text-field-error"
        errors={[error]}
      />
    </Field>
  );
}
