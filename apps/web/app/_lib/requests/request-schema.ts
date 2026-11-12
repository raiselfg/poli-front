import { z } from 'zod';

export const maxFileSize = 10 * 1024 * 1024;
export const acceptedExtensions = [
  'pdf',
  'jpg',
  'jpeg',
  'png',
  'webp',
  'docx',
  'dwg',
  'dxf',
];

export const requestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Укажите имя')
    .max(100, 'Не более 100 символов'),
  phone: z
    .string()
    .trim()
    .regex(/^\+7 \d{3}-\d{3}-\d{2}-\d{2}$/, 'Введите номер телефона'),
  comment: z.string(),
  file: z
    .file()
    .refine(
      (file) => file.size > 0 && file.size <= maxFileSize,
      'Файл должен быть не больше 10 МБ'
    )
    .refine((file) => {
      const extensionStart = file.name.lastIndexOf('.');
      return (
        extensionStart > 0 &&
        acceptedExtensions.includes(
          file.name.slice(extensionStart + 1).toLowerCase()
        )
      );
    }, 'Неподдерживаемый формат файла')
    .optional(),
});

export type RequestInput = z.output<typeof requestSchema>;
