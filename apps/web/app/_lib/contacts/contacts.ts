import { cacheLife } from 'next/cache';
import { FetchError } from 'ofetch';
import { api } from '@/lib/api';
import { contactsSchema, type Contacts } from './contacts-schema';

export async function getContacts(): Promise<Contacts | null> {
  'use cache';

  cacheLife({ stale: 30, revalidate: 30, expire: 60 });

  try {
    const response = await api<Contacts>('/contacts', {
      method: 'GET',
    });

    return contactsSchema.parse(response);
  } catch (error) {
    if (error instanceof FetchError && error.statusCode === 404) {
      return null;
    }

    throw error;
  }
}
