import { z } from 'zod';

const uuid = z.uuid();
export const statusSchema = z.enum(['new', 'in_progress', 'completed']);
export type RequestStatus = z.infer<typeof statusSchema>;
const requestBase = {
  id: uuid,
  name: z.string(),
  phone: z.string(),
  comment: z.string().nullable(),
  categoryId: uuid.nullable(),
  status: statusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
};
export const requestSchema = z.object({ ...requestBase, hasFile: z.boolean() });
const requestFileSchema = z.object({
  id: uuid,
  originalName: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number(),
  downloadUrl: z.string(),
});
export const requestDetailSchema = z
  .object({
    ...requestBase,
    file: requestFileSchema.nullable(),
    files: z.array(requestFileSchema).optional(),
  })
  .transform(({ file, files, ...request }) => ({
    ...request,
    files: files ?? (file ? [file] : []),
  }));

export type RequestFile = z.infer<typeof requestFileSchema>;
