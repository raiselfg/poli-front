import { Suspense } from 'react';
import { ArrowDown } from 'lucide-react';
import { accentAction, catalogFooterWrap } from '../landing-styles';
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
          <a href="#request" className={accentAction}>
            Изготовление на заказ
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogList />
        </Suspense>
      </div>
    </section>
  );
}
