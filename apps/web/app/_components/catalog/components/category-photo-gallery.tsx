'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/sheet';
import type { Category } from '../../../_lib/catalog/catalog-schema';

export function CategoryPhotoGallery({
  images,
  title,
  previews,
}: Pick<Category, 'images' | 'title'> & {
  previews: { index: number; photo: ReactNode; className: string }[];
}) {
  const [index, setIndex] = useState(0);
  const image = images.at(index) ?? images.at(0);

  if (image === undefined) return null;

  function step(offset: number) {
    setIndex((index) => (index + offset + images.length) % images.length);
  }

  return (
    <Sheet>
      {previews.map(({ photo, className, index: photoIndex }) => (
        <SheetTrigger
          key={images.at(photoIndex)?.id}
          aria-label={`Открыть фото ${String(photoIndex + 1)} из ${String(images.length)} категории «${title}»`}
          onClick={() => {
            setIndex(photoIndex);
          }}
          render={<Button variant="ghost" className={className} />}
        >
          {photo}
          {photoIndex === 0 && (
            <span className="pointer-events-none absolute right-2 bottom-2 grid size-7 place-items-center rounded-md bg-white/95 text-[#213b50]">
              <Images aria-hidden="true" />
            </span>
          )}
        </SheetTrigger>
      ))}
      <SheetContent
        side="bottom"
        className="mx-auto max-h-[100dvh] max-w-[880px] overflow-y-auto rounded-t-2xl"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            step(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        <SheetHeader className="pr-16">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="relative mx-4 h-[min(62dvh,560px)] shrink-0">
          <Image
            src={image.url}
            alt={image.alt ?? title}
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center gap-4 p-4">
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Предыдущее фото"
            onClick={() => {
              step(-1);
            }}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <span role="status" className="tabular-nums">
            {index + 1} / {images.length}
          </span>
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Следующее фото"
            onClick={() => {
              step(1);
            }}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
