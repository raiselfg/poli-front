import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { contactsSchema } from './schemas';

export const contactsQuery = queryOptions({
  queryKey: ['contacts'],
  meta: { errorTitle: 'Не удалось загрузить контакты' },
  queryFn: async ({ signal }) =>
    contactsSchema.parse(await api('/contacts', { signal })),
});
