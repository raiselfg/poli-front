import { createFileRoute } from '@tanstack/react-router';
import { Categories } from '@/features/categories/categories-page';

export const Route = createFileRoute('/_admin/categories/')({
  component: Categories,
});
