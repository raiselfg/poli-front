import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import { Link2 } from 'lucide-react';
import { requestsQuery } from '@/features/requests/data';
import { QueryState } from '@/components/query-state';
import { statusSchema } from '@/features/requests/schemas';
import { statusLabels } from '@/features/requests/request-constants';
export function Home() {
  const query = useQuery(requestsQuery);
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Главная</h1>
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Заявки</h2>
        <QueryState
          loading={query.isLoading}
          error={query.error}
          retry={() => void query.refetch()}
        />
        {query.data && (
          <div className="grid gap-3 sm:grid-cols-3">
            {statusSchema.options.map((status) => (
              <Link
                key={status}
                to="/requests"
                className="rounded-lg border p-4 hover:bg-muted focus-visible:outline-2"
              >
                <span className="text-sm text-muted-foreground">
                  {statusLabels[status]}
                </span>
                <p className="mt-2 text-2xl font-semibold">
                  {
                    query.data.filter((request) => request.status === status)
                      .length
                  }
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link to="/categories" />}
        >
          <Link2 aria-hidden="true" />
          Категории
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link to="/contacts" />}
        >
          <Link2 aria-hidden="true" />
          Контакты
        </Button>
      </div>
    </div>
  );
}
