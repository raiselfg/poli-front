import { Skeleton } from '@workspace/ui/components/skeleton';

export function CatalogSkeleton() {
  return (
    <div role="status" className="landing:grid-cols-2 grid gap-6">
      <span className="sr-only">Загружаем продукцию…</span>
      {[0, 1].map((index) => (
        <div
          key={index}
          aria-hidden="true"
          className="rounded-panel border-line bg-surface border"
        >
          <Skeleton className="h-gallery rounded-t-panel bg-line rounded-b-none motion-reduce:animate-none" />
          <div className="space-y-4 p-6">
            <Skeleton className="bg-line h-8 w-3/5 motion-reduce:animate-none" />
            <Skeleton className="bg-line h-4 w-4/5 motion-reduce:animate-none" />
            <Skeleton className="rounded-control bg-line h-12 w-32 motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
