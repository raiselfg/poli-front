import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { CategoryPage } from '@/features/categories/category-page';

export const Route = createFileRoute('/_admin/categories/$categoryId')({
  params: {
    parse: (params) => ({ categoryId: z.uuid().parse(params.categoryId) }),
    stringify: (params) => params,
  },
  component: CategoryRoute,
});
function CategoryRoute() {
  const { categoryId } = Route.useParams();
  return <CategoryPage categoryId={categoryId} />;
}
