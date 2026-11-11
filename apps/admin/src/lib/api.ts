import { ofetch } from 'ofetch';
import { z } from 'zod';

export const apiBase = z
  .url()
  .parse(import.meta.env.VITE_API_URL || 'https://api.poli.ru');

export const api = ofetch.create({
  baseURL: apiBase,
  credentials: 'include',
  retry: 0,
  onResponseError({ response, request }) {
    if (
      response.status === 401 &&
      !String(request).includes('/auth/login') &&
      window.location.pathname !== '/auth/login'
    ) {
      window.location.assign('/auth/login');
    }
  },
});

export const userSchema = z.object({
  id: z.uuid(),
  login: z.string(),
  created_at: z.string(),
});
