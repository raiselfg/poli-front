import { FetchError } from 'ofetch';
import type { CSSProperties } from 'react';
import { toast } from 'sonner';

export function errorMessage(error: unknown) {
  if (error instanceof FetchError) {
    if (error.statusCode === 401) return 'Сессия истекла. Войдите снова.';
    if (error.statusCode === 409)
      return 'Данные конфликтуют с существующими. Проверьте slug и повторите попытку.';
    if (error.statusCode === 413)
      return 'Файл слишком большой. Максимальный размер — 10 Мб.';
    if (error.statusCode === 415) return 'Неподдерживаемый формат файла.';
    if (error.statusCode === 404) return 'Данные не найдены.';
    if (error.statusCode === 422)
      return 'Проверьте правильность введённых данных.';
  }
  return 'Не удалось выполнить запрос. Попробуйте ещё раз.';
}

export function notifyError(title: string, description?: string) {
  toast.error(title, {
    description,
    id: `error:${title}:${description ?? ''}`,
    richColors: true,
    style: {
      '--error-text':
        'color-mix(in srgb, var(--destructive) 85%, var(--foreground))',
    } as CSSProperties,
  });
}

export function notifyInvalidForm(title: string) {
  notifyError(title, 'Исправьте ошибки в форме.');
}
