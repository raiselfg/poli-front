import { z } from 'zod';
import { api } from '@/lib/api';
import { requestDetailSchema, requestSchema } from './schemas';

export const requestsQuery = {
  queryKey: ['requests'],
  queryFn: async () =>
    z.array(requestSchema).parse(await api('/admin/requests')),
};
export const requestQuery = (id: string) => ({
  queryKey: ['requests', id],
  queryFn: async () =>
    requestDetailSchema.parse(await api(`/admin/requests/${id}`)),
});
