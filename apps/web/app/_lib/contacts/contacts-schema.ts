import { z } from 'zod';

export const contactsSchema = z.object({
  phone: z.string(),
  email: z.string().nullable(),
  address: z.string(),
  latitude: z.union([z.string(), z.number()]).nullable(),
  longitude: z.union([z.string(), z.number()]).nullable(),
  working_hours: z.string().nullable(),
  telegram_url: z
    .union([z.url({ protocol: /^https?$/ }), z.literal('')])
    .nullable(),
  whatsapp_url: z
    .union([z.url({ protocol: /^https?$/ }), z.literal('')])
    .nullable(),
  updated_at: z.string(),
});

export type Contacts = z.infer<typeof contactsSchema>;
