import { z } from 'zod';

const uuid = z.uuid();
export const imageSchema = z.object({
  id: uuid,
  url: z.url(),
  alt: z.string().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
});
export const categorySchema = z.object({
  id: uuid,
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(imageSchema),
  is_published: z.boolean(),
  sort_order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Category = z.infer<typeof categorySchema>;
export type CategoryImage = z.infer<typeof imageSchema>;
