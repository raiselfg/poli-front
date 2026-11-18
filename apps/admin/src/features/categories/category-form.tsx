import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { ArrowLeft } from 'lucide-react';
import { FetchError } from 'ofetch';
import { useRef } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import { errorMessage } from '@/lib/errors';
import { CategoryHelp } from './category-help';
import { CategoryImages } from './category-images';
import {
  categoryFormSchema,
  type CategoryFormValues,
} from './category-form-schema';
import {
  categoriesQuery,
  categoryQuery,
  deleteCategoryImage,
  saveCategory,
  updateCategoryImageAlt,
  uploadCategoryImage,
} from './data';
import type { Category } from './schemas';

const slugHelp =
  'Slug — часть адреса категории. Используйте строчные латинские буквы, цифры и дефисы, например: polyurethane-products. Пробелы и другие символы недопустимы.';

export function CategoryForm({ category }: { category?: Category }) {
  const navigate = useNavigate();
  const client = useQueryClient();
  // Сохранённые подписи учитываются при повторной попытке сохранить категорию.
  const savedAlts = useRef<Map<string, string | null> | null>(null);
  if (savedAlts.current === null) {
    savedAlts.current = new Map(
      category?.images.map(({ id, alt }) => [id, alt])
    );
  }
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: category?.title ?? '',
      slug: category?.slug ?? '',
      description: category?.description ?? '',
      is_published: category?.is_published ?? true,
      images:
        category?.images.map((image) => ({ ...image, alt: image.alt ?? '' })) ??
        [],
    },
  });
  const { errors } = useFormState({
    control: form.control,
    name: ['title', 'slug'],
    exact: true,
  });
  const upload = useMutation({
    mutationFn: uploadCategoryImage,
    onSuccess: (image) => {
      savedAlts.current?.set(image.id, image.alt);
      form.setValue('images', [...form.getValues('images'), image], {
        shouldDirty: true,
      });
      toast.success('Изображение добавлено');
    },
    onError: (error) =>
      toast.error(
        error instanceof Error && !(error.name === 'FetchError')
          ? error.message
          : errorMessage(error)
      ),
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteCategoryImage(id, category?.id),
    onSuccess: async (_, id) => {
      form.setValue(
        'images',
        form.getValues('images').filter((image) => image.id !== id),
        { shouldDirty: true, shouldValidate: true }
      );
      savedAlts.current?.delete(id);
      toast.success('Фото удалено');
      await Promise.all([
        client.invalidateQueries({ queryKey: categoriesQuery.queryKey }),
        category &&
          client.invalidateQueries({ queryKey: categoryQuery(category.id).queryKey }),
      ]);
    },
    onError: (error) =>
      toast.error(
        error instanceof FetchError && error.statusCode === 409
          ? 'Фото используется в другом месте. Сначала уберите его оттуда.'
          : errorMessage(error)
      ),
  });
  const save = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      for (const { id, alt } of values.images) {
        if (savedAlts.current?.get(id) !== alt) {
          await updateCategoryImageAlt(id, alt);
          savedAlts.current?.set(id, alt);
        }
      }
      return saveCategory(category?.id, values);
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: categoriesQuery.queryKey });
      toast.success('Категория сохранена');
      await navigate({ to: '/categories' });
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-col items-start gap-3">
        <Button
          variant="ghost"
          nativeButton={false}
          className="-ml-3 h-10 text-muted-foreground"
          render={<Link to="/categories" />}
        >
          <ArrowLeft aria-hidden="true" />
          Все категории
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {category ? 'Редактирование категории' : 'Новая категория'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {category
              ? 'Обновите описание, фотографии и видимость категории на сайте.'
              : 'Заполните данные новой категории и выберите, показывать ли её в каталоге на сайте.'}
          </p>
        </div>
      </div>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit((values) => save.mutate(values))}
        noValidate
      >
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">
            Название <span aria-hidden="true">*</span>
          </FieldLabel>
          <Input
            id="title"
            className="h-11"
            aria-required="true"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
            {...form.register('title')}
          />
          <FieldError id="title-error" errors={[errors.title]} />
        </Field>
        <Field data-invalid={!!errors.slug}>
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor="slug">
              Slug <span aria-hidden="true">*</span>
            </FieldLabel>
            <CategoryHelp label="Что такое slug?" text={slugHelp} />
          </div>
          <Input
            id="slug"
            className="h-11"
            aria-required="true"
            aria-invalid={!!errors.slug}
            aria-describedby={errors.slug ? 'slug-error' : undefined}
            {...form.register('slug')}
          />
          <FieldError id="slug-error" errors={[errors.slug]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Описание</FieldLabel>
          <Textarea
            id="description"
            rows={5}
            {...form.register('description')}
          />
        </Field>
        <Controller
          control={form.control}
          name="is_published"
          render={({ field }) => (
            <label className="flex items-center gap-3 text-sm font-medium">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              Отображать на сайте
            </label>
          )}
        />
        <CategoryImages
          form={form}
          disabled={save.isPending || upload.isPending || remove.isPending}
          onRemove={remove.mutate}
          removingId={remove.isPending ? remove.variables : undefined}
          uploadPending={upload.isPending}
          onUpload={(draft, onSuccess) => {
            upload.mutate(draft, { onSuccess });
          }}
        />
        <Button
          type="submit"
          disabled={save.isPending || upload.isPending || remove.isPending}
        >
          {save.isPending ? 'Сохранение…' : 'Сохранить'}
        </Button>
      </form>
    </div>
  );
}
