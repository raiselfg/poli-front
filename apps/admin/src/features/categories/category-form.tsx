import { zodResolver } from '@hookform/resolvers/zod';
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { ArrowLeft } from 'lucide-react';
import { FetchError } from 'ofetch';
import { useEffect, useRef } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import { errorMessage, notifyInvalidForm } from '@/lib/errors';
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
  pendingCategoryId,
  saveCategory,
  updateCategoryImageAlt,
  uploadCategoryImage,
} from './data';
import type { Category } from './schemas';

const slugHelp =
  'Slug — часть адреса категории. Используйте строчные латинские буквы, цифры и дефисы, например: polyurethane-products. Пробелы и другие символы недопустимы.';

function categoryValues(category?: Category): CategoryFormValues {
  return {
    title: category?.title ?? '',
    slug: category?.slug ?? '',
    description: category?.description ?? '',
    is_published: category?.is_published ?? true,
    images:
      category?.images.map((image) => ({ ...image, alt: image.alt ?? '' })) ??
      [],
  };
}

export function CategoryForm({ category }: { category?: Category }) {
  const navigate = useNavigate();
  const router = useRouter();
  const client = useQueryClient();
  const { queryKey } = categoriesQuery;
  const categoryId = category?.id;
  const detailKey = categoryQuery(categoryId ?? pendingCategoryId).queryKey;
  const busy = useIsMutating({ mutationKey: queryKey }) > 0;
  const refresh = () => client.invalidateQueries({ queryKey });

  async function snapshotCategories() {
    await client.cancelQueries({ queryKey });
    return {
      list: client.getQueryData(queryKey),
      detail: client.getQueryData(detailKey),
    };
  }

  function restoreCategories(
    snapshot?: Awaited<ReturnType<typeof snapshotCategories>>
  ) {
    client.setQueryData(queryKey, snapshot?.list);
    client.setQueryData(detailKey, snapshot?.detail);
  }
  // Сохранённые подписи учитываются при повторной попытке сохранить категорию.
  const savedAlts = useRef<Map<string, string | null> | null>(null);
  if (savedAlts.current === null) {
    savedAlts.current = new Map(
      category?.images.map(({ id, alt }) => [id, alt])
    );
  }
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: categoryValues(category),
  });
  const {
    reset,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    if (category && !busy && !isDirty) {
      reset(categoryValues(category));
      savedAlts.current = new Map(
        category.images.map(({ id, alt }) => [id, alt])
      );
    }
  }, [busy, category, isDirty, reset]);

  const { errors } = useFormState({
    control: form.control,
    name: ['title', 'slug'],
    exact: true,
  });
  const upload = useMutation({
    mutationKey: queryKey,
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
    mutationKey: queryKey,
    mutationFn: (id: string) => deleteCategoryImage(id, categoryId),
    onMutate: async (id) => {
      const snapshot = await snapshotCategories();
      const images = form.getValues('images');
      const withoutImage = (item: Category) => ({
        ...item,
        images: item.images.filter((image) => image.id !== id),
      });
      form.setValue(
        'images',
        images.filter((image) => image.id !== id),
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      client.setQueryData(queryKey, (items) =>
        items?.map((item) =>
          item.id === categoryId ? withoutImage(item) : item
        )
      );
      client.setQueryData(detailKey, (item) => item && withoutImage(item));
      return { ...snapshot, images };
    },
    onSuccess: (_, id) => {
      savedAlts.current?.delete(id);
      toast.success('Фото удалено');
    },
    onError: (error, _, snapshot) => {
      restoreCategories(snapshot);
      if (snapshot) {
        form.setValue('images', snapshot.images, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
      toast.error(
        error instanceof FetchError && error.statusCode === 409
          ? 'Фото используется в другом месте. Сначала уберите его оттуда.'
          : errorMessage(error)
      );
    },
    onSettled: refresh,
  });
  const save = useMutation({
    mutationKey: queryKey,
    mutationFn: async (values: CategoryFormValues) => {
      for (const { id, alt } of values.images) {
        if (savedAlts.current?.get(id) !== alt) {
          await updateCategoryImageAlt(id, alt);
          savedAlts.current?.set(id, alt);
        }
      }
      return saveCategory(categoryId, values);
    },
    onMutate: async (values) => {
      const pathname = router.state.location.pathname;
      const snapshot = await snapshotCategories();
      const optimistic: Category = {
        ...(snapshot.detail ??
          category ?? {
            id: pendingCategoryId,
            sort_order: 0,
            created_at: '',
            updated_at: '',
          }),
        ...values,
      };
      client.setQueryData(queryKey, (items) =>
        categoryId
          ? items?.map((item) => (item.id === categoryId ? optimistic : item))
          : items && [...items, optimistic]
      );
      if (categoryId) client.setQueryData(detailKey, optimistic);
      return { ...snapshot, pathname };
    },
    onSuccess: async (saved, _, snapshot) => {
      await client.cancelQueries({ queryKey });
      client.setQueryData(categoryQuery(saved.id).queryKey, saved);
      client.setQueryData(
        queryKey,
        (items) =>
          items &&
          [
            ...items.filter(
              (item) => item.id !== saved.id && item.id !== pendingCategoryId
            ),
            saved,
          ].sort(
            (a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)
          )
      );
      toast.success('Категория сохранена');
      if (router.state.location.pathname === snapshot?.pathname) {
        await navigate({ to: '/categories' });
      }
    },
    onError: (error, _, snapshot) => {
      restoreCategories(snapshot);
      toast.error(errorMessage(error));
    },
    onSettled: refresh,
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
        onSubmit={form.handleSubmit((values) => {
          if (!client.isMutating({ mutationKey: queryKey }))
            save.mutate(values);
        }, notifyInvalidForm)}
        noValidate
      >
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">
            Название <span aria-hidden="true">*</span>
          </FieldLabel>
          <Input
            id="title"
            readOnly={busy}
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
            readOnly={busy}
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
            readOnly={busy}
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
                disabled={busy}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              Отображать на сайте
            </label>
          )}
        />
        <CategoryImages
          form={form}
          disabled={busy}
          onRemove={(id) => {
            if (!client.isMutating({ mutationKey: queryKey }))
              remove.mutate(id);
          }}
          uploadPending={upload.isPending}
          onUpload={(draft, onSuccess) => {
            if (!client.isMutating({ mutationKey: queryKey })) {
              upload.mutate(draft, { onSuccess });
            }
          }}
        />
        <Button type="submit" disabled={busy}>
          {save.isPending ? 'Сохранение…' : 'Сохранить'}
        </Button>
      </form>
    </div>
  );
}
