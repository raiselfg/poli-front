import { z } from 'zod';

export const requestCreatedSchema = z.object({
  id: z.uuid(),
  status: z.enum(['new', 'in_progress', 'completed']),
  hasFile: z.boolean(),
  createdAt: z.string(),
});

export type RequestCreated = z.infer<typeof requestCreatedSchema>;
