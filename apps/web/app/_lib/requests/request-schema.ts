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
    .min(1, 'Укажите телефон')
    .max(15, 'Не более 15 символов'),
  comment: z.string(),
  file: z
    .file()
    .refine(
      (file) => file.size > 0 && file.size <= maxFileSize,
      'Размер файла должен быть не более 10 МиБ'
    )
    .refine(
      (file) =>
        acceptedExtensions.includes(
          file.name.split('.').pop()?.toLowerCase() ?? ''
        ),
      'Неподдерживаемый формат файла'
    )
    .optional(),
});

export type RequestInput = z.output<typeof requestSchema>;
