import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Field, FieldError, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { Textarea } from '@workspace/ui/components/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { ArrowLeft, CircleHelp } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/errors';
import { CategoryImages } from './category-images';
import { categorySchema, imageSchema, type Category } from './schemas';
import {
  categoryFormSchema,
  type CategoryFormValues,
} from './category-form-schema';

const slugHelp =
  'Slug — часть адреса категории. Используйте строчные латинские буквы, цифры и дефисы, например: polyurethane-products. Пробелы и другие символы недопустимы.';

export function CategoryForm({ category }: { category?: Category }) {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const [savedAlts, setSavedAlts] = useState<Record<string, string | null>>(
    () =>
      Object.fromEntries(
        (category?.images ?? []).map((image) => [image.id, image.alt])
      )
  );
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
  const images = useWatch({ control: form.control, name: 'images' });
  const upload = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error('Выберите изображение');
      if (!alt.trim() || alt.trim().length > 200)
        throw new Error('Введите описание изображения длиной до 200 символов');
      if (file.size > 10 * 1024 * 1024)
        throw new Error('Файл слишком большой. Максимальный размер — 10 Мб.');
      const body = new FormData();
      body.append('file', file);
      body.append('alt', alt.trim());
      return imageSchema
        .extend({ alt: z.string().trim().min(1) })
        .parse(await api('/admin/media', { method: 'POST', body }));
    },
    onSuccess: (image) => {
      setSavedAlts((previous) => ({ ...previous, [image.id]: image.alt }));
      form.setValue('images', [...form.getValues('images'), image], {
        shouldDirty: true,
      });
      setFile(null);
      setAlt('');
      toast.success('Изображение добавлено');
    },
    onError: (error) =>
      toast.error(
        error instanceof Error && !(error.name === 'FetchError')
          ? error.message
          : errorMessage(error)
      ),
  });
  const save = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      for (const image of values.images) {
        if (savedAlts[image.id] !== image.alt) {
          await api(`/admin/media/${image.id}`, {
            method: 'PATCH',
            body: { alt: image.alt },
          });
          setSavedAlts((previous) => ({ ...previous, [image.id]: image.alt }));
        }
      }
      const body = {
        title: values.title,
        slug: values.slug,
        description: values.description,
        is_published: values.is_published,
        mediaIds: values.images.map((image) => image.id),
      };
      return categorySchema.parse(
        await api(
          category ? `/admin/categories/${category.id}` : '/admin/categories',
          { method: category ? 'PATCH' : 'POST', body }
        )
      );
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Категория сохранена');
      await navigate({ to: '/categories' });
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
  function move(index: number, direction: number) {
    const items = [...form.getValues('images')];
    const target = index + direction;
    [items[index], items[target]] = [items[target]!, items[index]!];
    form.setValue('images', items, { shouldDirty: true });
  }
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
        <h1 className="text-2xl font-semibold tracking-tight">
          {category ? 'Редактирование категории' : 'Новая категория'}
        </h1>
      </div>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit((values) => save.mutate(values))}
        noValidate
      >
        <Field data-invalid={!!form.formState.errors.title}>
          <FieldLabel htmlFor="title">
            Название <span aria-hidden="true">*</span>
          </FieldLabel>
          <Input
            id="title"
            className="h-11"
            aria-required="true"
            aria-invalid={!!form.formState.errors.title}
            aria-describedby={
              form.formState.errors.title ? 'title-error' : undefined
            }
            {...form.register('title')}
          />
          <FieldError id="title-error" errors={[form.formState.errors.title]} />
        </Field>
        <Field data-invalid={!!form.formState.errors.slug}>
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor="slug">
              Slug <span aria-hidden="true">*</span>
            </FieldLabel>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 [@media(hover:none)]:hidden"
                    aria-label="Что такое slug?"
                  />
                }
              >
                <CircleHelp />
              </TooltipTrigger>
              <TooltipContent side="bottom">{slugHelp}</TooltipContent>
            </Tooltip>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hidden size-8 [@media(hover:none)]:inline-flex"
                    aria-label="Что такое slug?"
                  />
                }
              >
                <CircleHelp />
              </PopoverTrigger>
              <PopoverContent>{slugHelp}</PopoverContent>
            </Popover>
          </div>
          <Input
            id="slug"
            className="h-11"
            aria-required="true"
            aria-invalid={!!form.formState.errors.slug}
            aria-describedby={
              form.formState.errors.slug ? 'slug-error' : undefined
            }
            {...form.register('slug')}
          />
          <FieldError id="slug-error" errors={[form.formState.errors.slug]} />
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
          images={images}
          move={move}
          file={file}
          alt={alt}
          setFile={setFile}
          setAlt={setAlt}
          uploadPending={upload.isPending}
          savePending={save.isPending}
          onUpload={() => upload.mutate()}
        />
        <Button type="submit" disabled={save.isPending || upload.isPending}>
          {save.isPending ? 'Сохранение…' : 'Сохранить'}
        </Button>
      </form>
    </div>
  );
}
