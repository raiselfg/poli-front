import 'server-only';
import { ofetch } from 'ofetch';
import { z } from 'zod';

const apiUrl = z
  .url()
  .parse(process.env.API_URL ?? 'http://localhost:8000/api/v1');

export const api = ofetch.create({
  baseURL: apiUrl,
  retry: 0,
  timeout: 10000,
});
