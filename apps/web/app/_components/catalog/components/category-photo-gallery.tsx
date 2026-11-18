'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Sheet, SheetTrigger } from '@workspace/ui/components/sheet';
import type { Category } from '../../../_lib/catalog/catalog-schema';
import { CategoryPhotoTrack } from './category-photo-track';
import { CategoryPhotoViewer } from './category-photo-viewer';
import {
  navigateWithArrowKeys,
  type PhotoDirection,
  type PhotoTrackNavigation,
} from './photo-navigation';

const previewButtonClassName =
  'absolute top-1/2 size-11 -translate-y-1/2 rounded-full border-white/80 bg-white/95 text-zinc-900 shadow-sm transition-[background-color,border-color,color,translate] duration-300 ease-in-out active:bg-zinc-200 active:not-aria-[haspopup]:translate-y-[calc(-50%+1px)] motion-reduce:transition-none pointer-coarse:hidden';

export function CategoryPhotoGallery({
  images,
  title,
}: Pick<Category, 'images' | 'title'>) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const cardTrack = useRef<PhotoTrackNavigation>(null);
  if (images.length === 0) return null;

  const activeIndex = index % images.length;
  const hasMultipleImages = images.length > 1;
  const position = `${String(activeIndex + 1)} / ${String(images.length)}`;

  function step(offset: PhotoDirection) {
    setIndex((index) => (index + offset + images.length) % images.length);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div
        className="grid min-w-0 gap-2"
        onKeyDown={(event) => {
          if (hasMultipleImages)
            navigateWithArrowKeys(event, cardTrack.current);
        }}
      >
        <div className="relative">
          <SheetTrigger
            aria-label={`Открыть фото ${String(activeIndex + 1)} категории «${title}» на весь экран`}
            render={
              <Button
                variant="ghost"
                className="landing-photo-trigger border-line bg-bg relative aspect-[4/3] h-auto w-full cursor-zoom-in overflow-hidden rounded-[28px] border p-0"
              />
            }
          >
            <CategoryPhotoTrack
              images={images}
              title={title}
              index={activeIndex}
              ref={cardTrack}
              view="card"
              onStep={step}
            />
            <span
              aria-hidden="true"
              className="landing-photo-expand absolute right-3 bottom-3 grid size-9 cursor-pointer place-items-center rounded-full bg-white/95 text-zinc-900 shadow-sm"
            >
              <Maximize2 />
            </span>
          </SheetTrigger>
          {hasMultipleImages ? (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                aria-label="Предыдущее фото в карточке"
                className={`${previewButtonClassName} left-3`}
                onClick={() => {
                  cardTrack.current?.step(-1);
                }}
              >
                <ChevronLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                aria-label="Следующее фото в карточке"
                className={`${previewButtonClassName} right-3`}
                onClick={() => {
                  cardTrack.current?.step(1);
                }}
              >
                <ChevronRight aria-hidden="true" />
              </Button>
            </>
          ) : null}
        </div>
        {hasMultipleImages ? (
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto p-1">
              {images.map((photo, photoIndex) => (
                <Button
                  key={photo.id}
                  type="button"
                  variant="outline"
                  aria-label={`Показать фото ${String(photoIndex + 1)}`}
                  aria-pressed={activeIndex === photoIndex}
                  className="aria-pressed:border-landing-accent aria-pressed:ring-landing-accent border-line bg-bg relative aspect-[4/3] h-auto w-20 overflow-hidden rounded-lg p-0 transition-colors duration-300 ease-in-out aria-pressed:ring-1 motion-reduce:transition-none"
                  onClick={() => {
                    setIndex(photoIndex);
                  }}
                >
                  <Image
                    src={photo.url}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </Button>
              ))}
            </div>
            <span
              role="status"
              className="text-ink-muted shrink-0 pr-1 text-xs tabular-nums"
            >
              {position}
            </span>
          </div>
        ) : null}
      </div>
      <CategoryPhotoViewer
        images={images}
        title={title}
        index={activeIndex}
        position={position}
        onStep={step}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Sheet>
  );
}
