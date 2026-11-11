import { z } from 'zod';

const coordinate = (min: number, max: number) =>
  z
    .string()
    .refine(
      (v) =>
        !v.trim() ||
        (Number.isFinite(Number(v)) && Number(v) >= min && Number(v) <= max),
      'Некорректная координата'
    );
export const contactFormSchema = z
  .object({
    phone: z.string().trim().min(1, 'Введите телефон').max(40),
    email: z.string().max(254),
    address: z.string().trim().min(1, 'Введите адрес'),
    latitude: coordinate(-90, 90),
    longitude: coordinate(-180, 180),
    working_hours: z.string().max(255),
    telegram_url: z.string(),
    whatsapp_url: z.string(),
  })
  .refine((v) => Boolean(v.latitude.trim()) === Boolean(v.longitude.trim()), {
    path: ['longitude'],
    message: 'Укажите обе координаты или оставьте обе пустыми',
  });
export type ContactFormValues = z.infer<typeof contactFormSchema>;
