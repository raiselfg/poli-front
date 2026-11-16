import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { heading, textLink, wrap } from '../landing-styles';
import { CatalogList } from './components/catalog-list';
import { CatalogSkeleton } from './components/catalog-skeleton';

export function Catalog() {
  return (
    <section
      id="catalog"
      aria-labelledby="catalog-title"
      className="py-section"
    >
      <div className={wrap}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <h2 id="catalog-title" className={heading}>
            Что мы изготавливаем
          </h2>
          <a href="#request" className={textLink}>
            Изготовление на заказ
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogList />
        </Suspense>
      </div>
    </section>
  );
}
