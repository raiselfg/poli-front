import { Link } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/sheet';
import { ArrowLeft, Maximize2, Paperclip, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { categoriesQuery } from '@/features/categories/data';
import { fetchRequestFile, requestQuery } from '@/features/requests/data';
import { date } from '@/lib/date';
import { errorMessage } from '@/lib/errors';
import { QueryState } from '@/components/query-state';
import { requestDetailSchema, statusSchema } from '@/features/requests/schemas';
import { statusLabels } from '@/features/requests/request-constants';
export function RequestPage({ requestId }: { requestId: string }) {
  const query = useQuery(requestQuery(requestId));
  const categories = useQuery(categoriesQuery);
  const file = query.data?.file;
  const isImage = file?.mimeType.toLowerCase().startsWith('image/') ?? false;
  const preview = useQuery({
    queryKey: ['request-file', requestId, file?.id],
    queryFn: ({ signal }) => fetchRequestFile(requestId, signal),
    enabled: isImage,
  });
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
      const blob = preview.data ?? (await fetchRequestFile(requestId));
      const url = URL.createObjectURL(blob);
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
            <section
              aria-labelledby="request-file-heading"
              className="space-y-4 border-t pt-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <Paperclip
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  />
                  <div className="min-w-0">
                    <h2 id="request-file-heading" className="font-medium">
                      {file ? 'Прикреплённый файл' : 'Вложение'}
                    </h2>
                    <p
                      id="request-file-name"
                      className="mt-1 wrap-anywhere text-muted-foreground"
                    >
                      {file?.originalName ?? 'Файл не прикреплён'}
                    </p>
                  </div>
                </div>
                {file && (
                  <Button
                    variant="outline"
                    className="h-11 motion-reduce:transition-none"
                    aria-describedby="request-file-name"
                    onClick={() => void download()}
                  >
                    Скачать
                  </Button>
                )}
              </div>
              {isImage &&
                (preview.data ? (
                  <RequestImagePreview file={preview.data} />
                ) : (
                  <QueryState
                    loading={preview.isPending}
                    error={preview.error}
                    retry={() => void preview.refetch()}
                  />
                ))}
            </section>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RequestImagePreview({ file }: { file: Blob }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const fullscreenImageRef = useRef<HTMLImageElement>(null);
  const [failedFile, setFailedFile] = useState<Blob | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!imageRef.current) return;
    const url = URL.createObjectURL(file);
    imageRef.current.src = url;
    if (fullscreenImageRef.current) fullscreenImageRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Открыть изображение на весь экран"
        hidden={failedFile === file}
        render={
          <Button
            variant="ghost"
            className="relative h-auto max-w-full cursor-zoom-in rounded-md border-0 p-0 motion-reduce:transition-none"
          />
        }
      >
        <img
          ref={imageRef}
          alt="Изображение из заявки"
          className="max-h-112 max-w-full rounded-md object-contain"
          onError={() => setFailedFile(file)}
        />
        <span
          aria-hidden="true"
          className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-full bg-background/90 text-foreground"
        >
          <Maximize2 />
        </span>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="top-0 grid grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 data-[side=bottom]:h-dvh data-[side=bottom]:border-t-0 data-[side=bottom]:data-ending-style:translate-y-0 data-[side=bottom]:data-starting-style:translate-y-0 motion-reduce:transition-none sm:p-6"
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="pointer-events-none flex items-center justify-between gap-4">
          <SheetTitle className="pointer-events-auto">
            Изображение из заявки
          </SheetTitle>
          <SheetClose
            aria-label="Закрыть просмотр изображения"
            render={
              <Button
                variant="secondary"
                size="icon-lg"
                className="pointer-events-auto size-11"
              />
            }
          >
            <X aria-hidden="true" />
          </SheetClose>
        </div>
        <img
          ref={(image) => {
            fullscreenImageRef.current = image;
            if (image && imageRef.current) image.src = imageRef.current.src;
          }}
          alt="Изображение из заявки"
          className="size-full min-h-0 min-w-0 object-contain"
          onClick={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget;
            if (!naturalWidth || !naturalHeight) {
              setOpen(false);
              return;
            }
            // object-contain оставляет поля внутри элемента img.
            const { left, top, width, height } =
              event.currentTarget.getBoundingClientRect();
            const scale = Math.min(
              width / naturalWidth,
              height / naturalHeight
            );
            const x = event.clientX - left - width / 2;
            const y = event.clientY - top - height / 2;
            if (
              Math.abs(x) > (naturalWidth * scale) / 2 ||
              Math.abs(y) > (naturalHeight * scale) / 2
            ) {
              setOpen(false);
            }
          }}
        />
      </SheetContent>
      {failedFile === file && (
        <p role="alert" className="text-muted-foreground">
          Не удалось показать изображение.
        </p>
      )}
    </Sheet>
  );
}
