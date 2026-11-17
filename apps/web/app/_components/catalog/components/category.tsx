import { ArrowUpRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { textLink } from '../../landing-styles';
import type { Category as CategoryData } from '../../../_lib/catalog/catalog-schema';
import { categoryStyles } from '../constants/category-styles';
import { CategoryPhotoGallery } from './category-photo-gallery';

type CategoryProps = {
  category: CategoryData;
  index: number;
};

export function Category({ category, index }: CategoryProps) {
  const style = categoryStyles.at(index % categoryStyles.length);
  const content = (
    <div className="grid min-h-[500px] grid-cols-[1.1fr_0.9fr] gap-[8%] border-t border-zinc-200 py-[22px] group-even:grid-cols-[0.9fr_1.1fr] max-[900px]:min-h-[400px] max-[900px]:gap-[5%] max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-0 max-[700px]:py-[14px] max-[700px]:pb-[30px] max-[700px]:group-even:grid-cols-1">
      <div className="min-w-0 self-center group-even:order-2 max-[700px]:group-even:order-0">
        {category.images.length > 0 ? (
          <CategoryPhotoGallery
            images={category.images}
            title={category.title}
          />
        ) : (
          <div
            className={cn(
              'relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[28px] border border-white/90 shadow-[0_20px_45px_rgb(63_63_70_/_14%),0_4px_12px_rgb(63_63_70_/_7%),inset_0_1px_2px_#fff]',
              style?.surface
            )}
          >
            <div
              aria-hidden="true"
              className={`relative grid aspect-square w-1/2 place-items-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:scale-[1.035] max-[700px]:w-[46%] [&>span]:absolute [&>span]:aspect-square [&>span]:w-full [&>span]:rounded-full [&>span]:border [&>span]:border-zinc-400 [&>span:nth-child(2)]:w-[70%] [&>span:nth-child(3)]:w-[38%] [&>span:nth-child(3)]:border-dashed ${style?.shape ?? ''}`}
            >
              <span />
              <span />
              <span />
            </div>
            <span className="absolute bottom-[22px] left-[22px] flex items-center gap-[10px] text-[length:calc(11px*var(--text-scale))] text-zinc-700">
              Фотография пока не добавлена <ArrowUpRight size={14} />
            </span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center py-3 max-[700px]:pt-5">
        <div>
          <h3 className="m-0 text-[length:calc(clamp(42px,4vw,60px)*var(--text-scale))] leading-none font-[550] tracking-[-0.055em] wrap-anywhere hyphens-auto max-[700px]:text-[length:calc(43px*var(--text-scale))]">
            {category.title}
          </h3>
          <p className="my-5 max-w-[310px] text-[length:calc(15px*var(--text-scale))] leading-[1.7] wrap-anywhere text-zinc-700 max-[700px]:my-[15px]">
            {category.description}
          </p>
          <a href="#request" className={`${textLink} group/calculate`}>
            Рассчитать
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out motion-safe:group-hover/calculate:translate-x-0.75 motion-safe:group-focus-visible/calculate:translate-x-0.75"
            />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <article id={`category-${category.id}`} className="group scroll-mt-6">
      {content}
    </article>
  );
}
