import { Button } from '@workspace/ui/components/button';
import { errorMessage } from '@/lib/errors';

export function QueryState({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: unknown;
  retry: () => void;
}) {
  if (loading)
    return (
      <p role="status" className="text-muted-foreground">
        Загрузка…
      </p>
    );
  if (error)
    return (
      <div role="alert" className="space-y-3">
        <p>{errorMessage(error)}</p>
        <Button variant="outline" onClick={retry}>
          Повторить
        </Button>
      </div>
    );
  return null;
}
