import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { categorySchema } from './schemas';
import { CategoryForm } from './category-form';
import { QueryState } from '@/components/query-state';

export function CategoryPage({ categoryId }: { categoryId: string }) {
  const query = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () =>
      categorySchema.parse(await api(`/admin/categories/${categoryId}`)),
  });
  return (
    <>
      <QueryState
        loading={query.isLoading}
        error={query.error}
        retry={() => void query.refetch()}
      />
      {query.data && <CategoryForm key={query.data.id} category={query.data} />}
    </>
  );
}
