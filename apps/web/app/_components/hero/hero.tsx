import { Suspense } from 'react';
import Image from 'next/image';
import { unstable_rethrow } from 'next/navigation';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { getCategories } from '../../_lib/catalog/catalog';
import type { Category } from '../../_lib/catalog/catalog-schema';
import { action, wrap } from '../landing-styles';

const products = [
  'Втулки',
  'Отбойники',
  'Демпферы',
  'Манжеты',
  'Детали по чертежу',
];

function ProductLinks({ categories = [] }: { categories?: Category[] }) {
  const categoryIds = new Map(
    categories.map(({ id, title }) => [title.trim().toLowerCase(), id])
  );

  return (
    <ul aria-label="Ассортимент" className="flex flex-wrap gap-2">
      {products.map((product) => {
        const id = categoryIds.get(product.toLowerCase());
        const fallback =
          product === 'Детали по чертежу' ? '#request' : '#catalog';

        return (
          <li key={product}>
            <a
              href={id === undefined ? fallback : `#category-${id}`}
              className="landing-control rounded-chip border-ink hover:bg-ink hover:text-surface inline-flex min-h-8 items-center border px-2.5 py-1 text-sm font-medium"
            >
              {product}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

async function CatalogProductLinks() {
  const categories = await getCategories().catch((error: unknown) => {
    unstable_rethrow(error);
    return [];
  });
  return <ProductLinks categories={categories} />;
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="py-section">
      <div
        className={`${wrap} landing:grid-cols-[1.25fr_1fr] landing:gap-12 grid items-center gap-8`}
      >
        <div className="min-w-0">
          <h1
            id="hero-title"
            className="text-hero tracking-heading leading-none font-extrabold wrap-anywhere"
          >
            Изделия из
            <br />
            <span className="hero-highlight">полиуретана</span>
          </h1>
          <p className="text-ink-muted mt-6 max-w-prose text-lg leading-relaxed">
            Производство в Санкт-Петербурге деталей на заказ по чертежу, ТЗ или
            фотографии.
          </p>
          <div className="mt-6">
            <Suspense fallback={<ProductLinks />}>
              <CatalogProductLinks />
            </Suspense>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a className={action} href="#request">
              Прислать чертёж или фото
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="group/catalog inline-flex min-h-11 items-center gap-2.5 font-bold"
              href="#catalog"
            >
              <span className="group-hover/catalog:text-accent-ink group-focus-visible/catalog:text-accent-ink after:bg-accent-ink before:bg-accent-ink/40 relative before:absolute before:inset-x-0 before:-bottom-0.5 before:h-0.5 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 group-hover/catalog:after:scale-x-100 group-focus-visible/catalog:after:scale-x-100 motion-safe:transition-colors motion-safe:duration-300 motion-safe:after:transition-transform motion-safe:after:duration-300 forced-colors:underline">
                Смотреть продукцию
              </span>
              <span
                aria-hidden="true"
                className="bg-accent-ink/10 text-accent-ink group-hover/catalog:bg-landing-accent group-hover/catalog:text-on-dark group-focus-visible/catalog:bg-landing-accent group-focus-visible/catalog:text-on-dark size-8 shrink-0 overflow-hidden rounded-full motion-safe:transition-colors motion-safe:duration-300"
              >
                <span className="grid -translate-y-8 auto-rows-[2rem] place-items-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-(--landing-motion-ease) motion-safe:group-hover/catalog:translate-y-0 motion-safe:group-focus-visible/catalog:translate-y-0">
                  <ArrowDown size={16} />
                  <ArrowDown size={16} />
                </span>
              </span>
            </a>
          </div>
        </div>
        <Image
          src="/images/polyurethane-workshop.webp"
          alt="Промышленный пресс с формой и полиуретановые заготовки в цехе"
          width={1120}
          height={1120}
          preload
          sizes="(max-width: 1023px) min(100vw, 560px), min(44vw, 560px)"
          className="rounded-panel border-line landing:mx-0 landing:justify-self-end mx-auto h-auto w-full max-w-xl border object-cover"
        />
      </div>
    </section>
  );
}
