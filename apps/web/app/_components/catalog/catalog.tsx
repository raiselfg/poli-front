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
              'group/custom-link bg-landing-accent text-on-dark relative isolate h-auto min-h-13 justify-between gap-4 overflow-hidden rounded-full py-1.5 pr-1.5 pl-4 text-sm font-semibold shadow-md shadow-zinc-900/20 transition-none hover:bg-zinc-950 hover:shadow-lg hover:shadow-zinc-900/25 focus-visible:bg-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-700 focus-visible:outline-solid motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300 motion-safe:ease-in-out'
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-white/12 to-transparent opacity-0 group-hover/custom-link:opacity-100 group-focus-visible/custom-link:opacity-100 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-in-out motion-reduce:hidden"
            />
            Изготовление на заказ
            <span
              aria-hidden="true"
              className="bg-on-dark text-landing-accent grid size-9 shrink-0 place-items-center rounded-full"
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
