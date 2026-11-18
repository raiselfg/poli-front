import { Button } from '@workspace/ui/components/button';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { useFormState, useWatch, type UseFormReturn } from 'react-hook-form';
import type { CategoryFormValues } from './category-form-schema';
import { CategoryHelp } from './category-help';
import {
  CategoryImageUpload,
  type CategoryImageUploadProps,
} from './category-image-upload';

const imagesHelp =
  'Добавляйте изображения по одному: выберите файл, укажите описание и нажмите «Добавить изображение».';

type CategoryImagesProps = CategoryImageUploadProps & {
  form: Pick<
    UseFormReturn<CategoryFormValues>,
    'control' | 'getValues' | 'register' | 'setValue'
  >;
};

export function CategoryImages({
  form: { control, getValues, register, setValue },
  ...uploadProps
}: CategoryImagesProps) {
  const images = useWatch({ control, name: 'images' });
  const { errors } = useFormState({ control, name: 'images' });

  function move(index: number, direction: -1 | 1) {
    const items = [...getValues('images')];
    const target = index + direction;
    const current = items[index];
    const next = items[target];
    if (current === undefined || next === undefined) return;

    items[index] = next;
    items[target] = current;
    setValue('images', items, { shouldDirty: true });
  }

  function remove(index: number) {
    setValue(
      'images',
      getValues('images').filter((_, i) => i !== index),
      {
        shouldDirty: true,
      }
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">Изображения</h2>
        <CategoryHelp label="Как добавлять изображения?" text={imagesHelp} />
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
            <Field data-invalid={!!errors.images?.[index]?.alt}>
              <FieldLabel htmlFor={`image-alt-${index}`}>
                Альтернативный текст <span aria-hidden="true">*</span>
              </FieldLabel>
              <Input
                id={`image-alt-${index}`}
                maxLength={200}
                aria-required="true"
                aria-invalid={!!errors.images?.[index]?.alt}
                aria-describedby={
                  errors.images?.[index]?.alt
                    ? `image-alt-error-${index}`
                    : undefined
                }
                {...register(`images.${index}.alt`)}
              />
              <FieldError
                id={`image-alt-error-${index}`}
                errors={[errors.images?.[index]?.alt]}
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
              onClick={() => remove(index)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
      <CategoryImageUpload {...uploadProps} />
    </section>
  );
}
