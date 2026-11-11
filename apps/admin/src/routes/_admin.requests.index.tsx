import { createFileRoute } from '@tanstack/react-router';
import { Requests } from '@/features/requests/requests-page';

export const Route = createFileRoute('/_admin/requests/')({
  component: Requests,
});
