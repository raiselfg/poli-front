import { api } from '@/lib/api';
import { contactsSchema } from './schemas';

export const contactsQuery = {
  queryKey: ['contacts'],
  queryFn: async () => contactsSchema.parse(await api('/contacts')),
};
