import { Suspense } from 'react';
import { connection } from 'next/server';
import { ArrowUpRight } from 'lucide-react';
import { getCategories } from '../../_lib/catalog/catalog';
import { heading, textLink, wrap } from '../landing-styles';
import { Category } from './components/category';
import { CatalogSkeleton } from './components/catalog-skeleton';

export function Catalog() {
  return (
    <section
      id="catalog"
      className={`${wrap} scroll-mt-6 py-[145px] max-[700px]:py-[95px]`}
    >
      <div className="mb-20 grid grid-cols-[1fr_330px] items-end gap-[50px] max-[700px]:mb-[45px] max-[700px]:grid-cols-1 max-[700px]:gap-[25px]">
        <div>
          <h2 className={heading}>
            Форма следует
            <br />
            <span className="text-[#578ba6]">за задачей.</span>
          </h2>
        </div>
        <div className="border-t border-[#d0e1e9] pt-[17px]">
          <p className="mt-[30px] mb-[18px] text-[15px] leading-[1.7] text-[#607d8d] max-[700px]:mt-[18px] max-[700px]:mb-[10px]">
            Изделия из полиуретана для разных задач. Нужна особая деталь?
            Изготовим по вашему чертежу.
          </p>
          <a href="#custom" className={textLink}>
            Изготовление по чертежам <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogList />
      </Suspense>
    </section>
  );
}

async function CatalogList() {
  await connection();
  const result = await getCategories().then(
    (categories) => ({ categories, error: false as const }),
    (error: unknown) => {
      console.error('Не удалось загрузить продукцию', error);
      return { error: true as const };
    }
  );
  if (result.error)
    return (
      <p className="text-[#607d8d]">
        Не удалось загрузить продукцию. Попробуйте обновить страницу.
      </p>
    );
  if (result.categories.length === 0)
    return <p className="text-[#607d8d]">Продукция пока не добавлена.</p>;
  return (
    <div>
      {result.categories.map((category, index) => (
        <Category key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}
