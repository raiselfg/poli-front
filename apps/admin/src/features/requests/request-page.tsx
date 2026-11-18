import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader } from '@workspace/ui/components/card';
import { Field, FieldLabel } from '@workspace/ui/components/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { QueryState } from '@/components/query-state';
import { categoriesQuery } from '@/features/categories/data';
import { date } from '@/lib/date';
import { errorMessage, notifyError } from '@/lib/errors';
import { requestQuery, requestsQuery, updateRequestStatus } from './data';
import { RequestAttachment } from './request-attachment';
import { statusLabels } from './request-constants';
import { statusSchema, type RequestStatus } from './schemas';

export function RequestPage({ requestId }: { requestId: string }) {
  const detail = requestQuery(requestId);
  const query = useQuery(detail);
  const categories = useQuery(categoriesQuery);
  const client = useQueryClient();
  const { queryKey } = requestsQuery;
  const updating = useIsMutating({ mutationKey: queryKey }) > 0;

  function updateList(status: RequestStatus, updatedAt?: string) {
    client.setQueryData(queryKey, (items) =>
      items?.map((item) =>
        item.id === requestId
          ? { ...item, status, updatedAt: updatedAt ?? item.updatedAt }
          : item
      )
    );
  }

  const update = useMutation({
    mutationKey: [...queryKey, requestId],
    mutationFn: (status: RequestStatus) =>
      updateRequestStatus(requestId, status),
    onMutate: async (status) => {
      await client.cancelQueries({ queryKey });
      const previous = client.getQueryData(detail.queryKey);
      const previousStatus = client
        .getQueryData(queryKey)
        ?.find((item) => item.id === requestId)?.status;
      client.setQueryData(
        detail.queryKey,
        (item) => item && { ...item, status }
      );
      updateList(status);
      return { previous, previousStatus };
    },
    onSuccess: async (saved) => {
      await client.cancelQueries({ queryKey });
      client.setQueryData(detail.queryKey, saved);
      updateList(saved.status, saved.updatedAt);
      toast.success('Статус обновлён');
    },
    onError: (error, _, snapshot) => {
      client.setQueryData(detail.queryKey, snapshot?.previous);
      if (snapshot?.previousStatus) updateList(snapshot.previousStatus);
      notifyError('Не удалось обновить статус заявки', errorMessage(error));
    },
    onSettled: () => client.invalidateQueries({ queryKey }),
  });
  const item = query.data;
  return (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-2">
        <Button
          variant="ghost"
          nativeButton={false}
          className="-ml-3 h-11 text-muted-foreground motion-reduce:transition-none"
          render={<Link to="/requests" />}
        >
          <ArrowLeft aria-hidden="true" />
          Все заявки
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Заявка</h1>
          <p className="text-sm text-muted-foreground">
            Просмотрите данные клиента и вложения, затем обновите статус заявки.
          </p>
        </div>
      </div>
      <QueryState
        loading={query.isLoading || categories.isLoading}
        error={query.error || categories.error}
        retry={() => {
          void query.refetch();
          void categories.refetch();
        }}
      />
      {item && categories.data && (
        <Card>
          <CardHeader className="border-b">
            <Field className="gap-2 sm:max-w-52">
              <FieldLabel htmlFor="request-status">Статус</FieldLabel>
              <Select
                value={item.status}
                onValueChange={(value) => {
                  if (
                    value &&
                    value !== item.status &&
                    !client.isMutating({ mutationKey: queryKey })
                  ) {
                    update.mutate(value);
                  }
                }}
                disabled={updating}
              >
                <SelectTrigger
                  id="request-status"
                  className="data-[size=default]:h-11 motion-reduce:transition-none"
                >
                  <SelectValue>{statusLabels[item.status]}</SelectValue>
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="motion-reduce:animate-none!"
                >
                  {statusSchema.options.map((value) => (
                    <SelectItem key={value} value={value}>
                      {statusLabels[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </CardHeader>
          <CardContent className="space-y-5">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                ['Имя', item.name],
                ['Телефон', item.phone],
                ['Создана', date(item.createdAt)],
                ['Обновлена', date(item.updatedAt)],
                [
                  'Категория',
                  categories.data.find((c) => c.id === item.categoryId)
                    ?.title ?? 'Без категории',
                  'sm:col-span-2',
                ],
                ['Комментарий', item.comment || 'Нет', 'sm:col-span-2'],
              ].map(([label, value, className]) => (
                <div key={label} className={className}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-base wrap-anywhere whitespace-pre-wrap">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <section
              aria-labelledby="request-files-heading"
              className="space-y-4 border-t pt-5"
            >
              <h2 id="request-files-heading" className="font-medium">
                Вложения
              </h2>
              {item.files.length > 0 ? (
                <ul className="divide-y">
                  {item.files.map((file) => (
                    <li key={file.id} className="py-3 first:pt-0 last:pb-0">
                      <RequestAttachment requestId={requestId} file={file} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Файлы не прикреплены</p>
              )}
            </section>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
