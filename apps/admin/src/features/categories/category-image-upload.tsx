import { useEffect, useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@workspace/ui/components/button';
import { Field, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { notifyError } from '@/lib/errors';
import { imageSizeError, maxImageSize, type CategoryImageDraft } from './data';

export type CategoryImageUploadProps = {
  disabled: boolean;
  uploadPending: boolean;
  onUpload: (draft: CategoryImageDraft, onSuccess: () => void) => void;
};

export function CategoryImageUpload({
  disabled,
  uploadPending,
  onUpload,
}: CategoryImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const previewRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!file || !previewRef.current) return;
    const url = URL.createObjectURL(file);
    previewRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: maxImageSize,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    disabled,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        const code = rejectedFiles[0]?.errors[0]?.code;
        notifyError(
          'Не удалось добавить изображение',
          code === 'file-too-large'
            ? imageSizeError
            : code === 'too-many-files'
              ? 'Выберите одно изображение.'
              : 'Выберите изображение JPG, PNG или WebP.'
        );
        return;
      }
      if (acceptedFiles[0]) setFile(acceptedFiles[0]);
    },
  });

  function handleUpload() {
    onUpload({ file, alt }, () => {
      setFile(null);
      setAlt('');
    });
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <Field>
        <FieldLabel htmlFor="image-file">Добавить изображение</FieldLabel>
        <div
          {...getRootProps({
            role: 'presentation',
            className: `flex min-h-36 flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-4 py-6 text-center transition-colors motion-reduce:transition-none ${
              isDragActive ? 'border-primary bg-muted' : 'border-border'
            }`,
          })}
        >
          <Input
            {...getInputProps({
              id: 'image-file',
              'aria-describedby': 'image-file-help image-file-selection',
            })}
          />
          {file ? (
            <img
              ref={previewRef}
              alt="Предварительный просмотр выбранного изображения"
              className="max-h-48 max-w-full rounded-md object-contain"
            />
          ) : (
            <UploadCloud
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
          )}
          <p className="text-sm font-medium">Перетащите изображение сюда</p>
          <Button
            type="button"
            variant="outline"
            onClick={open}
            disabled={disabled}
          >
            Выбрать файл
          </Button>
          <p
            id="image-file-selection"
            role="status"
            className="max-w-full text-sm break-all text-muted-foreground"
          >
            {file?.name || 'Файл не выбран'}
          </p>
        </div>
        <p id="image-file-help" className="text-sm text-muted-foreground">
          JPG, PNG или WebP, до 10 Мб. Для загрузки выберите файл и укажите
          описание.
        </p>
      </Field>
      <Field>
        <FieldLabel htmlFor="new-alt">
          Альтернативный текст изображения при загрузке{' '}
          <span aria-hidden="true">*</span>
        </FieldLabel>
        <Input
          id="new-alt"
          aria-required={file !== null}
          value={alt}
          maxLength={200}
          onChange={(event) => setAlt(event.target.value)}
        />
      </Field>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={handleUpload}
      >
        {uploadPending ? 'Загрузка…' : 'Добавить изображение'}
      </Button>
    </div>
  );
}
