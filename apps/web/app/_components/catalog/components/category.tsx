import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { textLink } from '../../landing-styles';
import type { Category as CategoryData } from '../../../_lib/catalog/catalog-schema';
import { categoryStyles } from '../constants/category-styles';
import { CategoryModel, CategoryStory } from './category-model';
import { CategoryPhotoGallery } from './category-photo-gallery';

const categoryModels = new Map([
  ['vtulki', 'bushing'],
  ['otboyniki', 'bump-stop'],
  ['dempfery', 'damper'],
  ['manzhety', 'seal'],
]);

const customPartsImage = {
  url: '/images/custom-polyurethane-parts.webp',
  alt: 'Полиуретановые детали разных форм рядом с техническим чертежом',
  width: 1200,
  height: 900,
};

type CategoryProps = {
  category: CategoryData;
  index: number;
};

export function Category({ category, index }: CategoryProps) {
  const style = categoryStyles.at(index % categoryStyles.length);
  const isCustomParts =
    category.title.trim().toLowerCase().replaceAll('ё', 'е') ===
    'детали по чертежам';
  const firstPhoto = category.images.at(0);
  const image = firstPhoto ?? (isCustomParts ? customPartsImage : undefined);
  const model = categoryModels.get(category.slug);
  const hasModel = model !== undefined;
  const hasGallery = category.images.length > 1;
  const mainPhoto = image !== undefined && (
    <Image
      src={image.url}
      alt={image.alt ?? category.title}
      width={image.width ?? 800}
      height={image.height ?? 800}
      unoptimized
      className={
        image === customPartsImage
          ? 'absolute inset-0 h-full w-full object-cover'
          : 'h-full max-h-[455px] w-full object-contain'
      }
    />
  );
  const previewClassName =
    'relative block aspect-[4/3] w-full max-w-[112px] overflow-hidden rounded-lg';
  const firstPreviewIndex = hasModel ? 0 : 1;
  const previews = category.images
    .slice(firstPreviewIndex, firstPreviewIndex + 3)
    .map((photo, index) => ({
      index: firstPreviewIndex + index,
      className: cn(
        previewClassName,
        'h-auto cursor-pointer border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#347ba1]'
      ),
      photo: (
        <Image
          src={photo.url}
          alt={photo.alt ?? category.title}
          fill
          unoptimized
          className="object-cover"
        />
      ),
    }));
  const content = (
    <div className="grid min-h-[500px] grid-cols-[1.1fr_0.9fr] gap-[8%] border-t border-[#dceaf0] py-[22px] group-even:grid-cols-[0.9fr_1.1fr] max-[900px]:min-h-[400px] max-[900px]:gap-[5%] max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-0 max-[700px]:py-[14px] max-[700px]:pb-[30px] max-[700px]:group-even:grid-cols-1">
      <div
        className={cn(
          'relative grid min-h-[455px] place-items-center group-even:order-2 max-[900px]:min-h-[380px] max-[700px]:min-h-[310px] max-[700px]:group-even:order-0',
          hasModel
            ? 'motion-safe:[@media(min-height:620px)_and_(max-width:700px)]:min-h-[min(310px,43dvh)]'
            : [
                'overflow-hidden rounded-[28px] border border-white/90 shadow-[0_20px_45px_rgb(102_160_190_/_14%),0_4px_12px_rgb(102_160_190_/_7%),inset_0_1px_2px_#fff]',
                style?.surface,
              ]
        )}
      >
        {model !== undefined ? (
          <CategoryModel model={model} title={category.title} />
        ) : image !== undefined ? (
          mainPhoto
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
            <span className="absolute bottom-[22px] left-[22px] flex items-center gap-[10px] text-[length:calc(11px*var(--text-scale))] text-[#527587]">
              Фотография пока не добавлена <ArrowUpRight size={14} />
            </span>
          </>
        )}
      </div>
      <div
        className={cn(
          'flex flex-col justify-center py-3 max-[700px]:min-h-[260px] max-[700px]:gap-[30px] max-[700px]:pt-5',
          hasModel &&
            'motion-safe:[@media(min-height:620px)_and_(max-width:700px)]:min-h-0'
        )}
      >
        <div>
          <h3 className="m-0 text-[length:calc(clamp(42px,4vw,60px)*var(--text-scale))] leading-none font-[550] tracking-[-0.055em] max-[700px]:text-[length:calc(43px*var(--text-scale))]">
            {category.title}
          </h3>
          <p className="my-5 max-w-[310px] text-[length:calc(15px*var(--text-scale))] leading-[1.7] text-[#607d8d] max-[700px]:my-[15px]">
            {category.description}
          </p>
          {previews.length > 0 && (
            <div className="mb-4 grid max-w-[352px] grid-cols-3 gap-2">
              {hasGallery ? (
                <CategoryPhotoGallery
                  images={category.images}
                  title={category.title}
                  previews={previews}
                />
              ) : (
                <div className={previewClassName}>{previews.at(0)?.photo}</div>
              )}
            </div>
          )}
          <a
            href="#request"
            className={`${textLink} motion-safe:transition-[color,translate] motion-safe:ease-in-out motion-safe:hover:translate-x-2 motion-safe:focus-visible:translate-x-2`}
          >
            Рассчитать <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
  return hasModel ? (
    <CategoryStory>{content}</CategoryStory>
  ) : (
    <article className="group grid content-center motion-safe:min-h-[calc(100dvh-96px)]">
      {content}
    </article>
  );
}
