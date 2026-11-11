import { Skeleton } from '@workspace/ui/components/skeleton';

export function CatalogSkeleton() {
  return (
    <div role="status" aria-label="Загружаем продукцию">
      <div
        aria-hidden="true"
        className="grid min-h-[500px] grid-cols-[1.1fr_0.9fr] gap-[8%] border-t border-[#dceaf0] py-[22px] max-[900px]:min-h-[400px] max-[900px]:gap-[5%] max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-0 max-[700px]:pt-[14px] max-[700px]:pb-[30px]"
      >
        <Skeleton className="min-h-[455px] rounded-[28px] bg-[#e4f2f8] motion-reduce:animate-none max-[900px]:min-h-[380px] max-[700px]:min-h-[310px]" />
        <div className="flex flex-col justify-center gap-5 py-3 max-[700px]:min-h-[260px] max-[700px]:pt-5">
          <Skeleton className="h-[54px] w-3/5 max-w-[300px] bg-[#e4f2f8] motion-reduce:animate-none max-[700px]:h-[43px]" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full max-w-[310px] bg-[#e4f2f8] motion-reduce:animate-none" />
            <Skeleton className="h-4 w-3/4 max-w-[240px] bg-[#e4f2f8] motion-reduce:animate-none" />
          </div>
          <Skeleton className="h-5 w-[210px] max-w-full bg-[#e4f2f8] motion-reduce:animate-none" />
        </div>
      </div>
      <span className="sr-only">Загружаем продукцию…</span>
    </div>
  );
}
