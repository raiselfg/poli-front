import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api';
import { requestDetailSchema, requestSchema, statusSchema } from './schemas';

const requestListSchema = z.array(requestSchema);

export const requestsQuery = queryOptions({
  queryKey: ['requests'],
  queryFn: async () => requestListSchema.parse(await api('/admin/requests')),
});

export function requestQuery(id: string) {
  return queryOptions({
    queryKey: ['requests', id],
    queryFn: async () =>
      requestDetailSchema.parse(await api(`/admin/requests/${id}`)),
  });
}

export function fetchRequestFile(
  requestId: string,
  fileId: string,
  signal?: AbortSignal
) {
  return api(`/admin/requests/${requestId}/file`, {
    query: { file_id: fileId },
    responseType: 'blob',
    signal,
  });
}

export function requestFileQuery(
  requestId: string,
  fileId: string
) {
  return queryOptions({
    queryKey: ['request-file', requestId, fileId],
    queryFn: ({ signal }) => fetchRequestFile(requestId, fileId, signal),
  });
}

export async function updateRequestStatus(id: string, status: string) {
  return requestDetailSchema.parse(
    await api(`/admin/requests/${id}`, {
      method: 'PATCH',
      body: { status: statusSchema.parse(status) },
    })
  );
}
