import { Button } from '@workspace/ui/components/button';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import {
  ArrowDown,
  ArrowUp,
  CircleHelp,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import type { CategoryFormValues } from './category-form-schema';

const imagesHelp =
  'Добавляйте изображения по одному: выберите файл, укажите описание и нажмите «Добавить изображение».';

type CategoryImagesProps = {
  form: UseFormReturn<CategoryFormValues>;
  images: CategoryFormValues['images'];
  move: (index: number, direction: number) => void;
  file: File | null;
  alt: string;
  setFile: Dispatch<SetStateAction<File | null>>;
  setAlt: Dispatch<SetStateAction<string>>;
  uploadPending: boolean;
  savePending: boolean;
  onUpload: () => void;
};

export function CategoryImages({
  form,
  images,
  move,
  file,
  alt,
  setFile,
  setAlt,
  uploadPending,
  savePending,
  onUpload,
}: CategoryImagesProps) {
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
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    disabled: uploadPending || savePending,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        const code = rejectedFiles[0]?.errors[0]?.code;
        toast.error(
          code === 'file-too-large'
            ? 'Файл слишком большой. Максимальный размер — 10 Мб.'
            : code === 'too-many-files'
              ? 'Выберите одно изображение.'
              : 'Выберите изображение JPG, PNG или WebP.'
        );
        return;
      }
      if (acceptedFiles[0]) setFile(acceptedFiles[0]);
    },
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">Изображения</h2>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 [@media(hover:none)]:hidden"
                aria-label="Как добавлять изображения?"
              />
            }
          >
            <CircleHelp aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent side="bottom">{imagesHelp}</TooltipContent>
        </Tooltip>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden size-8 [@media(hover:none)]:inline-flex"
                aria-label="Как добавлять изображения?"
              />
            }
          >
            <CircleHelp aria-hidden="true" />
          </PopoverTrigger>
          <PopoverContent>{imagesHelp}</PopoverContent>
        </Popover>
      </div>
      {images.map((image, index) => (
        <div
          key={image.id}
          className="flex flex-wrap items-start gap-4 border-b pb-4"
        >
          <img
            src={image.url}
            alt={image.alt}
            className="size-24 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1 basis-48">
            <Field data-invalid={!!form.formState.errors.images?.[index]?.alt}>
              <FieldLabel htmlFor={`image-alt-${index}`}>
                Альтернативный текст <span aria-hidden="true">*</span>
              </FieldLabel>
              <Input
                id={`image-alt-${index}`}
                maxLength={200}
                aria-required="true"
                aria-invalid={!!form.formState.errors.images?.[index]?.alt}
                aria-describedby={
                  form.formState.errors.images?.[index]?.alt
                    ? `image-alt-error-${index}`
                    : undefined
                }
                {...form.register(`images.${index}.alt`)}
              />
              <FieldError
                id={`image-alt-error-${index}`}
                errors={[form.formState.errors.images?.[index]?.alt]}
              />
            </Field>
          </div>
          <div className="flex">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Переместить изображение вверх"
              disabled={index === 0}
              onClick={() => move(index, -1)}
            >
              <ArrowUp />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Переместить изображение вниз"
              disabled={index === images.length - 1}
              onClick={() => move(index, 1)}
            >
              <ArrowDown />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Убрать изображение из категории"
              onClick={() =>
                form.setValue(
                  'images',
                  images.filter((_, i) => i !== index),
                  { shouldDirty: true }
                )
              }
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
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
              disabled={uploadPending || savePending}
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
          disabled={uploadPending || savePending}
          onClick={onUpload}
        >
          {uploadPending ? 'Загрузка…' : 'Добавить изображение'}
        </Button>
      </div>
    </section>
  );
}
