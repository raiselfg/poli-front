import { z } from 'zod';

const categoryImageSchema = z.object({
  id: z.uuid(),
  url: z.url({ protocol: /^https?$/ }),
  alt: z.string().nullable(),
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
});

export const categorySchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(categoryImageSchema),
});

export const categoriesSchema = z.array(categorySchema);
export type Category = z.infer<typeof categorySchema>;
