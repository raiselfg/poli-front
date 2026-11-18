import { Skeleton } from '@workspace/ui/components/skeleton';

export function CatalogSkeleton() {
  return (
    <div role="status" aria-label="Загружаем продукцию">
      <div
        aria-hidden="true"
        className="border-line grid min-h-[500px] grid-cols-[1.1fr_0.9fr] gap-[8%] border-t py-[22px] max-[900px]:min-h-[400px] max-[900px]:gap-[5%] max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-0 max-[700px]:pt-[14px] max-[700px]:pb-[30px]"
      >
        <Skeleton className="bg-line rounded-panel min-h-[455px] motion-reduce:animate-none max-[900px]:min-h-[380px] max-[700px]:min-h-[310px]" />
        <div className="flex flex-col justify-center gap-5 py-3 max-[700px]:min-h-[260px] max-[700px]:pt-5">
          <Skeleton className="bg-line h-[54px] w-3/5 max-w-[300px] motion-reduce:animate-none max-[700px]:h-[43px]" />
          <div className="space-y-3">
            <Skeleton className="bg-line h-4 w-full max-w-[310px] motion-reduce:animate-none" />
            <Skeleton className="bg-line h-4 w-3/4 max-w-[240px] motion-reduce:animate-none" />
          </div>
          <Skeleton className="bg-line h-5 w-[210px] max-w-full motion-reduce:animate-none" />
        </div>
      </div>
      <span className="sr-only">Загружаем продукцию…</span>
    </div>
  );
}
