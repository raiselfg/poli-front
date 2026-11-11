import { FetchError } from 'ofetch';

export function errorMessage(error: unknown) {
  if (error instanceof FetchError) {
    if (error.statusCode === 401) return 'Сессия истекла. Войдите снова.';
    if (error.statusCode === 409)
      return 'Данные конфликтуют с существующими. Проверьте slug и повторите попытку.';
    if (error.statusCode === 413)
      return 'Файл слишком большой. Максимальный размер — 10 МиБ.';
    if (error.statusCode === 415) return 'Неподдерживаемый формат файла.';
    if (error.statusCode === 404) return 'Данные не найдены.';
    if (error.statusCode === 422)
      return 'Проверьте правильность введённых данных.';
  }
  return 'Не удалось выполнить запрос. Попробуйте ещё раз.';
}
