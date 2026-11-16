import { Suspense } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { getCategories } from '../../_lib/catalog/catalog';
import type { Category } from '../../_lib/catalog/catalog-schema';
import { action, textLink, wrap } from '../landing-styles';

const products = [
  'Втулки',
  'Отбойники',
  'Демпферы',
  'Манжеты',
  'Детали по чертежу',
];

const facts = [
  {
    title: 'Чертёж не обязателен',
    text: 'Подойдёт эскиз, образец или фото.',
  },
  {
    title: 'Подберём материал',
    text: 'Уточним размеры и подберём полиуретан.',
  },
  {
    title: 'Цена по запросу',
    text: 'После уточнения деталей и объёма.',
  },
  {
    title: 'Для предприятий и частных лиц',
    text: 'Работаем с юрлицами и частными заказчиками.',
  },
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
              className="rounded-chip border-ink hover:bg-ink hover:text-surface inline-flex min-h-8 items-center border px-2.5 py-1 text-sm font-medium"
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
  const categories = await getCategories().catch(() => []);
  return <ProductLinks categories={categories} />;
}

export function Hero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="py-section">
        <div
          className={`${wrap} landing:grid-cols-[1.25fr_1fr] landing:gap-12 grid items-center gap-8`}
        >
          <div className="min-w-0">
            <p className="text-ink-muted mb-5 font-mono text-xs font-bold tracking-widest">
              {'// ПРОИЗВОДСТВО · САНКТ-ПЕТЕРБУРГ'}
            </p>
            <h1
              id="hero-title"
              className="text-hero tracking-heading leading-none font-extrabold wrap-anywhere"
            >
              Изделия из
              <br />
              <span className="hero-highlight">полиуретана</span>
            </h1>
            <p className="text-ink-muted mt-6 max-w-prose text-lg leading-relaxed">
              Производство в Санкт-Петербурге деталей на заказ по чертежу, ТЗ
              или фотографии.
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
              <a className={textLink} href="#catalog">
                Смотреть продукцию
                <ArrowDown size={16} aria-hidden="true" />
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
      <div className="bg-ink text-surface">
        <dl className={`${wrap} landing:grid-cols-4 grid grid-cols-2`}>
          {facts.map(({ title, text }) => (
            <div
              key={title}
              className="border-line-dark landing:px-5 landing:py-8 landing:not-first:border-l landing:nth-[3]:pl-5 landing:nth-[n+3]:border-t-0 min-w-0 px-3 py-6 first:pl-0 even:border-l nth-[3]:pl-0 nth-[n+3]:border-t"
            >
              <dt className="text-fact text-amber-accent font-mono leading-tight font-bold wrap-anywhere">
                {title}
              </dt>
              <dd className="text-ink-on-dark-muted mt-2 text-sm leading-relaxed">
                {text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
