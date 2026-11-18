import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Paperclip } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { QueryState } from '@/components/query-state';
import { errorMessage, notifyError } from '@/lib/errors';
import { fetchRequestFile, requestFileQuery } from './data';
import { RequestImagePreview } from './request-image-preview';
import type { RequestFile } from './schemas';

export function RequestAttachment({
  requestId,
  file,
}: {
  requestId: string;
  file: RequestFile;
}) {
  const client = useQueryClient();
  const isImage = file.mimeType.toLowerCase().startsWith('image/');
  const fileQuery = requestFileQuery(requestId, file.id);
  const preview = useQuery({ ...fileQuery, enabled: isImage });

  async function download() {
    try {
      // Если предпросмотр прервался, скачивание всё ещё может завершиться.
      const blob =
        preview.data ??
        (preview.isFetching
          ? await client
              .fetchQuery(fileQuery)
              .catch(() => fetchRequestFile(requestId, file.id))
          : await fetchRequestFile(requestId, file.id));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.originalName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      notifyError('Не удалось скачать вложение', errorMessage(error));
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <Paperclip
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          />
          <p id={`request-file-${file.id}`} className="min-w-0 wrap-anywhere">
            {file.originalName}
          </p>
        </div>
        <Button
          variant="outline"
          className="h-11 motion-reduce:transition-none"
          aria-describedby={`request-file-${file.id}`}
          onClick={() => void download()}
        >
          Скачать
        </Button>
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
    </div>
  );
}
