import { z } from 'zod';

export const maxFiles = 3;
export const maxFileSize = 5 * 1024 * 1024;
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

const requestFileSchema = z
  .file()
  .min(1, 'Пустой файл нельзя прикрепить')
  .max(maxFileSize, 'Каждый файл должен быть не больше 5 МБ')
  .refine((file) => {
    const extensionStart = file.name.lastIndexOf('.');
    return (
      extensionStart > 0 &&
      acceptedExtensions.includes(
        file.name.slice(extensionStart + 1).toLowerCase()
      )
    );
  }, 'Неподдерживаемый формат файла');

export const requestFilesSchema = z
  .array(requestFileSchema)
  .max(maxFiles, 'Можно прикрепить до 3 файлов');

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
  consent: z
    .boolean()
    .refine(
      (value) => value,
      'Подтвердите согласие на обработку персональных данных'
    ),
  files: requestFilesSchema,
});

export type RequestInput = z.output<typeof requestSchema>;
