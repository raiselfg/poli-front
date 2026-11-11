import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { requestsQuery } from '@/features/requests/data';
import { categoriesQuery } from '@/features/categories/data';
import { date } from '@/lib/date';
import { QueryState } from '@/components/query-state';
import { statusSchema } from '@/features/requests/schemas';
import { statusLabels } from '@/features/requests/request-constants';
export function Requests() {
  const [filter, setFilter] = useState('all');
  const requests = useQuery(requestsQuery);
  const categories = useQuery(categoriesQuery);
  const shown = requests.data?.filter(
    (item) => filter === 'all' || item.status === filter
  );
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Заявки</h1>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <label htmlFor="status-filter" className="text-sm font-medium">
          Статус
        </label>
        <Select
          value={filter}
          onValueChange={(value) => value && setFilter(value)}
        >
          <SelectTrigger id="status-filter" className="h-11 w-full sm:w-52">
            <SelectValue>
              {filter === 'all'
                ? 'Все заявки'
                : statusLabels[statusSchema.parse(filter)]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все заявки</SelectItem>
            {statusSchema.options.map((value) => (
              <SelectItem key={value} value={value}>
                {statusLabels[value]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <QueryState
        loading={requests.isLoading || categories.isLoading}
        error={requests.error || categories.error}
        retry={() => {
          void requests.refetch();
          void categories.refetch();
        }}
      />
      {shown &&
        categories.data &&
        (shown.length ? (
          <ul className="divide-y border-y">
            {shown.map((item) => (
              <li key={item.id}>
                <Link
                  to="/requests/$requestId"
                  params={{ requestId: item.id }}
                  className="flex flex-wrap items-center justify-between gap-3 py-4 hover:text-primary focus-visible:outline-2"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="font-medium break-words">{item.name}</p>
                    <p className="text-sm break-words text-muted-foreground">
                      {item.phone} ·{' '}
                      {categories.data.find((c) => c.id === item.categoryId)
                        ?.title ?? 'Без категории'}
                      {item.hasFile ? ' · Есть вложение' : ''}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p>{statusLabels[item.status]}</p>
                    <p className="text-muted-foreground">
                      {date(item.createdAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Заявок нет.</p>
        ))}
    </div>
  );
}
