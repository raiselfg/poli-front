import { useQuery } from '@tanstack/react-query';
import { QueryState } from '@/components/query-state';
import { CategoryForm } from './category-form';
import { categoryQuery } from './data';

export function CategoryPage({ categoryId }: { categoryId: string }) {
  const query = useQuery(categoryQuery(categoryId));

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
