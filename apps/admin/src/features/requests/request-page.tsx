import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { errorMessage } from '@/lib/errors';
import {
  requestFileQuery,
  requestQuery,
  requestsQuery,
  updateRequestStatus,
} from './data';
import { RequestAttachment } from './request-attachment';
import { statusLabels } from './request-constants';
import { statusSchema } from './schemas';

export function RequestPage({ requestId }: { requestId: string }) {
  const query = useQuery(requestQuery(requestId));
  const categories = useQuery(categoriesQuery);
  const file = query.data?.file ?? null;
  const isImage = file?.mimeType.toLowerCase().startsWith('image/') ?? false;
  const preview = useQuery({
    ...requestFileQuery(requestId, file?.id),
    enabled: isImage,
  });
  const client = useQueryClient();
  const update = useMutation({
    mutationFn: (status: string) => updateRequestStatus(requestId, status),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: requestsQuery.queryKey });
      toast.success('Статус обновлён');
    },
    onError: (error) => toast.error(errorMessage(error)),
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
        <h1 className="text-2xl font-semibold tracking-tight">Заявка</h1>
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
                  if (value && value !== item.status) update.mutate(value);
                }}
                disabled={update.isPending}
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
            <RequestAttachment
              requestId={requestId}
              file={file}
              preview={preview}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
