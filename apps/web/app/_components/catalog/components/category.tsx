import { ArrowUpRight } from 'lucide-react';
import type { Category as CatalogCategory } from '../../../_lib/catalog/catalog-schema';
import { action } from '../../landing-styles';
import { CategoryPhotoGallery } from './category-photo-gallery';

export function Category({ category }: { category: CatalogCategory }) {
  return (
    <article
      id={`category-${category.id}`}
      className="rounded-panel border-line bg-surface flex min-w-0 flex-col border"
    >
      {category.images.length > 0 ? (
        <CategoryPhotoGallery images={category.images} title={category.title} />
      ) : (
        <div className="h-gallery rounded-t-panel border-line bg-bg text-ink-muted grid place-items-center border-b p-4 text-center font-mono text-sm">
          Фотография пока не добавлена
        </div>
      )}
      <div className="flex flex-1 flex-col items-start gap-4 p-6">
        <h3 className="text-card-title tracking-heading leading-tight font-extrabold wrap-anywhere">
          {category.title}
        </h3>
        <p className="text-ink-muted leading-relaxed wrap-anywhere">
          {category.description}
        </p>
        <a href="#request" className={`${action} mt-auto`}>
          Рассчитать <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
