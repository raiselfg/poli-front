import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api';
import type { CategoryFormValues } from './category-form-schema';
import { categorySchema, imageSchema } from './schemas';

const categoryListSchema = z.array(categorySchema);
const uploadedImageSchema = imageSchema.extend({
  alt: z.string().trim().min(1),
});

export const maxImageSize = 10 * 1024 * 1024;
export const imageSizeError =
  'Файл слишком большой. Максимальный размер — 10 Мб.';

export type CategoryImageDraft = {
  file: File | null;
  alt: string;
};

export const categoriesQuery = queryOptions({
  queryKey: ['categories'],
  queryFn: async () => categoryListSchema.parse(await api('/admin/categories')),
});

export function categoryQuery(id: string) {
  return queryOptions({
    queryKey: ['category', id],
    queryFn: async () =>
      categorySchema.parse(await api(`/admin/categories/${id}`)),
  });
}

export async function uploadCategoryImage({ file, alt }: CategoryImageDraft) {
  if (file === null) throw new Error('Выберите изображение');
  const description = alt.trim();
  if (description.length === 0 || description.length > 200) {
    throw new Error('Введите описание изображения длиной до 200 символов');
  }
  if (file.size > maxImageSize) throw new Error(imageSizeError);

  const body = new FormData();
  body.append('file', file);
  body.append('alt', description);
  return uploadedImageSchema.parse(
    await api('/admin/media', { method: 'POST', body })
  );
}

export function updateCategoryImageAlt(id: string, alt: string) {
  return api(`/admin/media/${id}`, { method: 'PATCH', body: { alt } });
}

export function deleteCategoryImage(id: string, categoryId?: string) {
  return api(`/admin/media/${id}`, {
    method: 'DELETE',
    query: { category_id: categoryId },
  });
}

export async function saveCategory(
  id: string | undefined,
  values: CategoryFormValues
) {
  const body = {
    title: values.title,
    slug: values.slug,
    description: values.description,
    is_published: values.is_published,
    mediaIds: values.images.map((image) => image.id),
  };
  return categorySchema.parse(
    await api(
      id === undefined ? '/admin/categories' : `/admin/categories/${id}`,
      {
        method: id === undefined ? 'POST' : 'PATCH',
        body,
      }
    )
  );
}
