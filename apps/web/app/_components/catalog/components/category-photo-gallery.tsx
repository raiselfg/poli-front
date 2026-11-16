'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/sheet';
import type { Category } from '../../../_lib/catalog/catalog-schema';
import {
  CategoryPhotoTrack,
  type PhotoTrackNavigation,
} from './category-photo-track';

export function CategoryPhotoGallery({
  images,
  title,
}: Pick<Category, 'images' | 'title'>) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const cardTrack = useRef<PhotoTrackNavigation>(null);
  const fullscreenTrack = useRef<PhotoTrackNavigation>(null);
  if (images.length === 0) return null;

  const activeIndex = index % images.length;
  const hasMultipleImages = images.length > 1;
  const position = `${String(activeIndex + 1)} / ${String(images.length)}`;

  function step(offset: number) {
    setIndex((index) => (index + offset + images.length) % images.length);
  }

  function handleArrowKeys(event: KeyboardEvent<HTMLElement>) {
    if (
      hasMultipleImages &&
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
    ) {
      event.preventDefault();
      const track = open ? fullscreenTrack : cardTrack;
      track.current?.step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="grid min-w-0 gap-2" onKeyDown={handleArrowKeys}>
        <div className="relative">
          <SheetTrigger
            aria-label={`Открыть фото ${String(activeIndex + 1)} категории «${title}» на весь экран`}
            render={
              <Button
                variant="ghost"
                className="relative aspect-[4/3] h-auto w-full cursor-default overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-100 p-0"
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
              className="absolute right-3 bottom-3 grid size-9 cursor-pointer place-items-center rounded-full bg-white/95 text-zinc-900 shadow-sm"
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
                className="absolute top-1/2 left-3 size-11 -translate-y-1/2 rounded-full border-white/80 bg-white/95 text-zinc-900 shadow-sm transition-[background-color,translate] duration-100 active:bg-zinc-200 active:not-aria-[haspopup]:translate-y-[calc(-50%+1px)] motion-reduce:transition-none"
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
                className="absolute top-1/2 right-3 size-11 -translate-y-1/2 rounded-full border-white/80 bg-white/95 text-zinc-900 shadow-sm transition-[background-color,translate] duration-100 active:bg-zinc-200 active:not-aria-[haspopup]:translate-y-[calc(-50%+1px)] motion-reduce:transition-none"
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
                  className="relative aspect-[4/3] h-auto w-20 overflow-hidden rounded-lg border-zinc-200 bg-zinc-100 p-0 aria-pressed:border-zinc-800 aria-pressed:ring-1 aria-pressed:ring-zinc-800"
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
              className="shrink-0 pr-1 text-xs text-zinc-700 tabular-nums"
            >
              {position}
            </span>
          </div>
        ) : null}
      </div>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="top-0 grid grid-rows-[3.5rem_minmax(0,1fr)_3.5rem] bg-zinc-950 px-3 text-white data-[side=bottom]:h-dvh data-[side=bottom]:border-t-0 data-[side=bottom]:data-ending-style:translate-y-0 data-[side=bottom]:data-starting-style:translate-y-0 motion-reduce:transition-none sm:px-5"
        onKeyDown={handleArrowKeys}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="pointer-events-none flex min-w-0 items-center justify-between gap-4">
          <SheetTitle className="min-w-0 truncate text-white">
            {title}
          </SheetTitle>
          <SheetClose
            aria-label="Закрыть просмотр фото"
            render={
              <Button
                variant="secondary"
                size="icon-lg"
                className="pointer-events-auto size-11 cursor-pointer rounded-full"
              />
            }
          >
            <X aria-hidden="true" />
          </SheetClose>
        </div>
        <CategoryPhotoTrack
          images={images}
          title={title}
          index={activeIndex}
          ref={fullscreenTrack}
          view="fullscreen"
          onStep={step}
        />
        {hasMultipleImages ? (
          <div className="pointer-events-none flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="icon-lg"
              aria-label="Предыдущее фото"
              className="pointer-events-auto size-11 cursor-pointer rounded-full"
              onClick={() => {
                fullscreenTrack.current?.step(-1);
              }}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <span role="status" className="tabular-nums">
              {position}
            </span>
            <Button
              variant="secondary"
              size="icon-lg"
              aria-label="Следующее фото"
              className="pointer-events-auto size-11 cursor-pointer rounded-full"
              onClick={() => {
                fullscreenTrack.current?.step(1);
              }}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
