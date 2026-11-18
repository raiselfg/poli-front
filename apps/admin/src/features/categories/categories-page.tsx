import { Link } from '@tanstack/react-router';
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/errors';
import { QueryState } from '@/components/query-state';
import { requestsQuery } from '@/features/requests/data';
import { categoriesQuery, categoryQuery, pendingCategoryId } from './data';
import type { Category } from './schemas';

export function Categories() {
  const query = useQuery(categoriesQuery);
  const client = useQueryClient();
  const { queryKey } = categoriesQuery;
  const busy = useIsMutating({ mutationKey: queryKey }) > 0;
  const items = query.data?.filter((item) => item.id !== pendingCategoryId);
  const pendingCategory = query.data?.find(
    (item) => item.id === pendingCategoryId
  );
  const refresh = () => client.invalidateQueries({ queryKey });

  async function optimisticList(update: (items: Category[]) => Category[]) {
    await client.cancelQueries({ queryKey });
    const previous = client.getQueryData(queryKey);
    client.setQueryData(queryKey, (items) => items && update(items));
    return { previous };
  }

  function rollback(
    error: Error,
    _: unknown,
    snapshot?: { previous: Category[] | undefined }
  ) {
    client.setQueryData(queryKey, snapshot?.previous);
    toast.error(errorMessage(error));
  }

  const order = useMutation({
    mutationKey: queryKey,
    mutationFn: (items: Category[]) =>
      api('/admin/categories/order', {
        method: 'PUT',
        body: { ids: items.map((item) => item.id) },
      }),
    onMutate: (items) => optimisticList(() => items),
    onError: rollback,
    onSettled: refresh,
  });
  const remove = useMutation({
    mutationKey: queryKey,
    mutationFn: (id: string) =>
      api(`/admin/categories/${id}`, { method: 'DELETE' }),
    onMutate: (id) =>
      optimisticList((items) => items.filter((item) => item.id !== id)),
    onSuccess: (_, id) => {
      toast.success('Категория удалена');
      return client.resetQueries({
        queryKey: categoryQuery(id).queryKey,
        exact: true,
      });
    },
    onError: rollback,
    onSettled: () => {
      const requestKey = requestsQuery.queryKey;
      return Promise.all([
        refresh(),
        client.invalidateQueries({
          queryKey: requestKey,
          refetchType: client.isMutating({ mutationKey: requestKey })
            ? 'none'
            : 'active',
        }),
      ]);
    },
  });
  function move(index: number, direction: number) {
    if (client.isMutating({ mutationKey: queryKey })) return;

    const reordered = [...(items ?? [])];
    const target = index + direction;
    const current = reordered[index];
    const next = reordered[target];
    if (!current || !next) return;

    reordered[index] = next;
    reordered[target] = current;
    order.mutate(
      reordered.map((item, sort_order) => ({ ...item, sort_order }))
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Категории</h1>
          <p className="text-sm text-muted-foreground">
            Управляйте категориями каталога, их видимостью и порядком на сайте.
          </p>
        </div>
        <Button render={<Link to="/categories/new" />}>
          Добавить категорию
        </Button>
      </div>
      <QueryState
        loading={query.isLoading}
        error={query.error}
        retry={() => void query.refetch()}
      />
      {items &&
        (items.length || pendingCategory ? (
          <ul className="divide-y border-y">
            {items.map((item, index) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <Link
                  to="/categories/$categoryId"
                  params={{ categoryId: item.id }}
                  className="min-w-0 flex-1 hover:underline"
                >
                  <p className="font-medium break-words">{item.title}</p>
                  <p className="text-sm break-all text-muted-foreground">
                    {item.slug} ·{' '}
                    {item.is_published ? 'Отображается на сайте' : 'Скрыта'}
                  </p>
                </Link>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Поднять ${item.title}`}
                    disabled={index === 0 || busy}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Опустить ${item.title}`}
                    disabled={index === items.length - 1 || busy}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Удалить ${item.title}`}
                          disabled={busy}
                        />
                      }
                    >
                      <Trash2 />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить категорию?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Категория «{item.title}» будет удалена, а у связанных
                          заявок категория будет очищена.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={busy}
                          onClick={() => {
                            if (!client.isMutating({ mutationKey: queryKey })) {
                              remove.mutate(item.id);
                            }
                          }}
                        >
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
            {pendingCategory && (
              <li className="py-4" role="status">
                <p className="font-medium break-words">
                  {pendingCategory.title}
                </p>
                <p className="text-sm text-muted-foreground">Сохранение…</p>
              </li>
            )}
          </ul>
        ) : (
          <p className="text-muted-foreground">Категорий пока нет.</p>
        ))}
    </div>
  );
}
