import { api } from '@/lib/api';
import {
  requestCreatedSchema,
  type RequestCreated,
} from './request-response-schema';
import type { RequestInput } from './request-schema';

export async function createRequest(
  input: RequestInput
): Promise<RequestCreated> {
  const body = new FormData();
  body.set('name', input.name);
  body.set('phone', input.phone);

  if (input.comment !== '') {
    body.set('comment', input.comment);
  }

  for (const file of input.files) {
    body.append('file', file);
  }

  const response = await api<RequestCreated>('/requests', {
    method: 'POST',
    body,
  });

  return requestCreatedSchema.parse(response);
}
