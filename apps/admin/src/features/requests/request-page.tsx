import { Link } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { categoriesQuery } from '@/features/categories/data';
import { requestQuery } from '@/features/requests/data';
import { date } from '@/lib/date';
import { errorMessage } from '@/lib/errors';
import { QueryState } from '@/components/query-state';
import { requestDetailSchema, statusSchema } from '@/features/requests/schemas';
import { statusLabels } from '@/features/requests/request-constants';
export function RequestPage({ requestId }: { requestId: string }) {
  const query = useQuery(requestQuery(requestId));
  const categories = useQuery(categoriesQuery);
  const client = useQueryClient();
  const update = useMutation({
    mutationFn: async (status: string) =>
      requestDetailSchema.parse(
        await api(`/admin/requests/${requestId}`, {
          method: 'PATCH',
          body: { status: statusSchema.parse(status) },
        })
      ),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['requests'] });
      toast.success('Статус обновлён');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
  async function download() {
    try {
      const response = await api.raw(`/admin/requests/${requestId}/file`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response._data!);
      const a = document.createElement('a');
      a.href = url;
      a.download = query.data?.file?.originalName ?? 'file';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }
  const item = query.data;
  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/requests" className="text-sm underline">
        ← Все заявки
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Заявка</h1>
      <QueryState
        loading={query.isLoading || categories.isLoading}
        error={query.error || categories.error}
        retry={() => {
          void query.refetch();
          void categories.refetch();
        }}
      />
      {item && categories.data && (
        <div className="space-y-6">
          <dl className="grid gap-5 sm:grid-cols-2">
            {[
              ['Имя', item.name],
              ['Телефон', item.phone],
              [
                'Категория',
                categories.data.find((c) => c.id === item.categoryId)?.title ??
                  'Без категории',
              ],
              ['Создана', date(item.createdAt)],
              ['Обновлена', date(item.updatedAt)],
              ['Комментарий', item.comment || 'Нет'],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-1 break-words whitespace-pre-wrap">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="space-y-2">
            <label htmlFor="request-status" className="text-sm font-medium">
              Статус
            </label>
            <Select
              value={item.status}
              onValueChange={(value) => {
                if (value) update.mutate(value);
              }}
              disabled={update.isPending}
            >
              <SelectTrigger id="request-status" className="h-11 min-w-44">
                <SelectValue>{statusLabels[item.status]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusSchema.options.map((value) => (
                  <SelectItem key={value} value={value}>
                    {statusLabels[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {item.file && (
            <Button
              variant="outline"
              className="h-auto max-w-full break-all whitespace-normal"
              onClick={() => void download()}
            >
              Скачать {item.file.originalName}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
