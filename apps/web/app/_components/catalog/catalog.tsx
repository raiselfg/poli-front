import { Suspense } from 'react';
import { ArrowDown } from 'lucide-react';
import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { catalogFooterWrap } from '../landing-styles';
import { CatalogList } from './components/catalog-list';
import { CatalogSkeleton } from './components/catalog-skeleton';

export function Catalog() {
  return (
    <section
      id="catalog"
      aria-labelledby="catalog-title"
      className="scroll-mt-6 bg-[linear-gradient(180deg,transparent,#71717a36_100px,#71717a36_calc(100%_-_120px),transparent)] pt-16 pb-24 max-[700px]:py-6"
    >
      <div className={catalogFooterWrap}>
        <div className="mb-6 flex items-end justify-between gap-x-8 gap-y-2 max-[900px]:flex-col max-[900px]:items-start">
          <h2
            id="catalog-title"
            className="text-[length:calc(clamp(28px,4.35vw,60px)*var(--text-scale))] leading-[0.98] font-medium tracking-[-0.045em] wrap-anywhere hyphens-auto max-[700px]:text-[length:calc(clamp(27px,7vw,42px)*var(--text-scale))]"
          >
            Что мы изготавливаем
          </h2>
          <a
            href="#request"
            className={cn(
              buttonVariants(),
              'group/custom-link bg-landing-accent text-surface relative isolate h-auto min-h-13 justify-between gap-4 overflow-hidden rounded-full py-1.5 pr-1.5 pl-4 text-sm font-semibold shadow-md shadow-zinc-900/20 transition-none hover:bg-zinc-950 hover:shadow-lg hover:shadow-zinc-900/25 focus-visible:bg-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-700 focus-visible:outline-solid motion-safe:transition-[background-color,box-shadow]'
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 -translate-x-[130%] -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent duration-500 ease-out group-hover/custom-link:translate-x-[230%] group-focus-visible/custom-link:translate-x-[230%] motion-safe:group-hover/custom-link:transition-transform motion-safe:group-focus-visible/custom-link:transition-transform motion-reduce:hidden"
            />
            Изготовление на заказ
            <span
              aria-hidden="true"
              className="bg-surface text-landing-accent grid size-9 shrink-0 place-items-center rounded-full"
            >
              <ArrowDown className="size-[18px]" />
            </span>
          </a>
        </div>
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogList />
        </Suspense>
      </div>
    </section>
  );
}
