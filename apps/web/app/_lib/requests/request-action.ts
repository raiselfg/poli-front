'use server';

import { FetchError } from 'ofetch';
import { requestSchema } from './request-schema';
import { createRequest } from './requests';

export async function submitRequest(formData: FormData) {
  const file = formData.get('file');
  const parsed = requestSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    comment: formData.get('comment') ?? '',
    consent: formData.get('consent') === 'true',
    file: file instanceof File && file.name !== '' ? file : undefined,
  });
  if (!parsed.success)
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? 'Проверьте данные заявки.',
    };

  try {
    await createRequest(parsed.data);
    return { ok: true, message: 'Заявка отправлена. Мы свяжемся с вами.' };
  } catch (error) {
    if (error instanceof FetchError && error.statusCode === 413)
      return {
        ok: false,
        message: 'Файл слишком большой. Максимальный размер — 10 Мб.',
      };
    if (error instanceof FetchError && error.statusCode === 415)
      return {
        ok: false,
        message: 'Не удалось распознать файл. Проверьте его формат.',
      };
    return {
      ok: false,
      message:
        'Не удалось подтвердить отправку. Проверьте, получена ли заявка, прежде чем отправлять её повторно.',
    };
  }
}
