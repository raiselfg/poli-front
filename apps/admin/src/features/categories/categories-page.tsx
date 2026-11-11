import { Link } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { categoriesQuery } from '@/features/categories/data';
import { errorMessage } from '@/lib/errors';
import { QueryState } from '@/components/query-state';
export function Categories() {
  const query = useQuery(categoriesQuery);
  const client = useQueryClient();
  const refresh = () => client.invalidateQueries({ queryKey: ['categories'] });
  const order = useMutation({
    mutationFn: (ids: string[]) =>
      api('/admin/categories/order', { method: 'PUT', body: { ids } }),
    onSuccess: refresh,
    onError: (error) => toast.error(errorMessage(error)),
  });
  const remove = useMutation({
    mutationFn: (id: string) =>
      api(`/admin/categories/${id}`, { method: 'DELETE' }),
    onSuccess: async () => {
      await refresh();
      toast.success('Категория удалена');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
  function move(index: number, direction: number) {
    const ids = query.data!.map((item) => item.id);
    const target = index + direction;
    [ids[index], ids[target]] = [ids[target]!, ids[index]!];
    order.mutate(ids);
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Категории</h1>
        <Button render={<Link to="/categories/new" />}>
          Добавить категорию
        </Button>
      </div>
      <QueryState
        loading={query.isLoading}
        error={query.error}
        retry={() => void query.refetch()}
      />
      {query.data &&
        (query.data.length ? (
          <ul className="divide-y border-y">
            {query.data.map((item, index) => (
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
                    disabled={index === 0 || order.isPending}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Опустить ${item.title}`}
                    disabled={
                      index === query.data.length - 1 || order.isPending
                    }
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
                          disabled={remove.isPending}
                          onClick={() => remove.mutate(item.id)}
                        >
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Категорий пока нет.</p>
        ))}
    </div>
  );
}
