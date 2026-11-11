import { createFileRoute } from '@tanstack/react-router';
import { CategoryForm } from '@/features/categories/category-form';
export const Route = createFileRoute('/_admin/categories/new')({
  component: () => <CategoryForm />,
});
