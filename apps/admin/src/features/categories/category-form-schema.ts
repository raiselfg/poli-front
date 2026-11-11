import { z } from 'zod';
import { imageSchema } from './schemas';

export const categoryFormSchema = z.object({
  title: z.string().trim().min(1, 'Введите название').max(160),
  slug: z
    .string()
    .min(1, 'Введите slug')
    .max(120)
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      'Используйте строчные латинские буквы, цифры и дефисы'
    ),
  description: z.string(),
  is_published: z.boolean(),
  images: z.array(
    imageSchema.extend({
      alt: z.string().trim().min(1, 'Введите описание').max(200),
    })
  ),
});
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
