import { useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@workspace/ui/components/button';
import { QueryState } from '@/components/query-state';
import { errorMessage } from '@/lib/errors';
import { fetchRequestFile, requestFileQuery } from './data';
import { RequestImagePreview } from './request-image-preview';
import type { RequestFile } from './schemas';

export function RequestAttachment({
  requestId,
  file,
  preview,
}: {
  requestId: string;
  file: RequestFile | null;
  preview: UseQueryResult<Blob>;
}) {
  const client = useQueryClient();
  const isImage = preview.isEnabled;

  async function download() {
    if (file === null) return;

    try {
      // Если предпросмотр прервался, скачивание всё ещё может завершиться.
      const blob =
        preview.data ??
        (preview.isFetching
          ? await client
              .fetchQuery(requestFileQuery(requestId, file.id))
              .catch(() => fetchRequestFile(requestId))
          : await fetchRequestFile(requestId));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.originalName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  return (
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
  );
}
