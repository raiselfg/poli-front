import { createFileRoute } from '@tanstack/react-router';
import { Contacts } from '@/features/contacts/contacts-page';

export const Route = createFileRoute('/_admin/contacts')({
  component: Contacts,
});
