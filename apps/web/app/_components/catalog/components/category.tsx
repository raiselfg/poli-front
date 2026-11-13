import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { textLink } from '../../landing-styles';
import type { Category as CategoryData } from '../../../_lib/catalog/catalog-schema';
import { categoryStyles } from '../constants/category-styles';
import { CategoryModel } from './category-model';

const categoryModels = new Map([
  ['vtulki', 'bushing'],
  ['otboyniki', 'bump-stop'],
  ['dempfery', 'damper'],
  ['manzhety', 'seal'],
]);

type CategoryProps = {
  category: CategoryData;
  index: number;
};

export function Category({ category, index }: CategoryProps) {
  const style = categoryStyles.at(index % categoryStyles.length);
  const image = category.images.at(0);
  const model = categoryModels.get(category.slug);
  return (
    <article className="group grid min-h-[500px] grid-cols-[1.1fr_0.9fr] gap-[8%] border-t border-[#dceaf0] py-[22px] even:grid-cols-[0.9fr_1.1fr] max-[900px]:min-h-[400px] max-[900px]:gap-[5%] max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-0 max-[700px]:py-[14px] max-[700px]:pb-[30px] max-[700px]:even:grid-cols-1">
      <div
        className={`relative grid min-h-[455px] place-items-center overflow-hidden rounded-[28px] border border-white/90 shadow-[0_20px_45px_rgb(102_160_190_/_14%),0_4px_12px_rgb(102_160_190_/_7%),inset_0_1px_2px_#fff] group-even:order-2 max-[900px]:min-h-[380px] max-[700px]:min-h-[310px] max-[700px]:group-even:order-0 ${style?.surface ?? ''}`}
      >
        {image !== undefined ? (
          <Image
            src={image.url}
            alt={image.alt ?? category.title}
            width={image.width ?? 800}
            height={image.height ?? 800}
            unoptimized
            className="h-full max-h-[455px] w-full object-contain"
          />
        ) : model !== undefined ? (
          <CategoryModel model={model} title={category.title} />
        ) : (
          <>
            <div
              aria-hidden="true"
              className={`relative grid aspect-square w-1/2 place-items-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:scale-[1.035] max-[700px]:w-[46%] [&>span]:absolute [&>span]:aspect-square [&>span]:w-full [&>span]:rounded-full [&>span]:border [&>span]:border-[#a7cad9] [&>span:nth-child(2)]:w-[70%] [&>span:nth-child(3)]:w-[38%] [&>span:nth-child(3)]:border-dashed ${style?.shape ?? ''}`}
            >
              <span />
              <span />
              <span />
            </div>
            <span className="absolute bottom-[22px] left-[22px] flex items-center gap-[10px] text-[11px] text-[#527587]">
              Фотография пока не добавлена <ArrowUpRight size={14} />
            </span>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center py-3 max-[700px]:min-h-[260px] max-[700px]:gap-[30px] max-[700px]:pt-5">
        <div>
          <h3 className="m-0 text-[clamp(42px,4vw,60px)] leading-none font-[550] tracking-[-0.055em] max-[700px]:text-[43px]">
            {category.title}
          </h3>
          <p className="my-5 max-w-[310px] text-[15px] leading-[1.7] text-[#607d8d] max-[700px]:my-[15px]">
            {category.description}
          </p>
          <a
            href="#request"
            className={`${textLink} motion-safe:transition-[color,translate] motion-safe:ease-in-out motion-safe:hover:translate-x-2 motion-safe:focus-visible:translate-x-2`}
          >
            Рассчитать <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}
