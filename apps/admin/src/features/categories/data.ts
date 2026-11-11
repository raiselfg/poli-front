import { z } from 'zod';
import { api } from '@/lib/api';
import { categorySchema } from './schemas';

export const categoriesQuery = {
  queryKey: ['categories'],
  queryFn: async () =>
    z.array(categorySchema).parse(await api('/admin/categories')),
};
