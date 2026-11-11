import { cacheLife } from 'next/cache';
import { api } from '@/lib/api';
import { categoriesSchema, type Category } from './catalog-schema';

export async function getCategories(): Promise<Category[]> {
  'use cache';

  cacheLife({ stale: 30, revalidate: 30, expire: 60 });

  const response = await api<Category[]>('/categories', {
    method: 'GET',
  });

  return categoriesSchema.parse(response);
}
