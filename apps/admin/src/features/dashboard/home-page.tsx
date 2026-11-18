import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Folder, Phone } from 'lucide-react';
import { requestsQuery } from '@/features/requests/data';
import { QueryState } from '@/components/query-state';
import { statusSchema } from '@/features/requests/schemas';
import { statusLabels } from '@/features/requests/request-constants';

const siteSettings = [
  {
    to: '/categories',
    title: 'Категории каталога',
    description: 'Редактируйте категории и порядок их показа на сайте.',
    icon: Folder,
  },
  {
    to: '/contacts',
    title: 'Контакты на сайте',
    description: 'Обновляйте телефон, адрес и часы работы.',
    icon: Phone,
  },
] as const;

export function Home() {
  const query = useQuery(requestsQuery);
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Главная</h1>
        <p className="text-sm text-muted-foreground">
          Сводка по статусам заявок и быстрый переход к настройкам сайта.
        </p>
      </div>
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
      <nav aria-labelledby="site-settings-heading" className="space-y-4">
        <h2 id="site-settings-heading" className="text-lg font-medium">
          Настройки сайта
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {siteSettings.map(({ to, title, description, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-start gap-3 rounded-lg border p-4 hover:bg-muted focus-visible:outline-2"
            >
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <ChevronRight
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              />
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
