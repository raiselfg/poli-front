import { Skeleton } from '@workspace/ui/components/skeleton';
import { CatalogSkeleton } from './_components/catalog/components/catalog-skeleton';
import { catalogFooterWrap, wrap } from './_components/landing-styles';

export default function Loading() {
  return (
    <main className="landing bg-bg text-ink">
      <div role="status">
        <span className="sr-only">Загружаем страницу…</span>
        <div aria-hidden="true">
          <div className="border-line border-b">
            <div
              className={`${wrap} h-header flex items-center justify-between`}
            >
              <Skeleton className="bg-line h-6 w-40 motion-reduce:animate-none" />
              <Skeleton className="rounded-control bg-line landing:w-40 h-11 w-11 motion-reduce:animate-none" />
            </div>
          </div>
          <div
            className={`${wrap} py-section landing:grid-cols-2 grid items-center gap-8`}
          >
            <div className="space-y-5">
              <Skeleton className="bg-line h-6 w-3/5 motion-reduce:animate-none" />
              <Skeleton className="bg-line h-24 w-full motion-reduce:animate-none" />
              <Skeleton className="rounded-control bg-line h-12 w-56 max-w-full motion-reduce:animate-none" />
            </div>
            <Skeleton className="rounded-panel bg-line aspect-square w-full max-w-xl motion-reduce:animate-none" />
          </div>
        </div>
      </div>
      <div className={`${catalogFooterWrap} pt-16 pb-24 max-[700px]:py-6`}>
        <CatalogSkeleton />
      </div>
    </main>
  );
}
