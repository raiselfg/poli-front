import { useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  SheetClose,
  SheetContent,
  SheetTitle,
} from '@workspace/ui/components/sheet';
import type { Category } from '../../../_lib/catalog/catalog-schema';
import { CategoryPhotoTrack } from './category-photo-track';
import {
  navigateWithArrowKeys,
  type PhotoTrackNavigation,
} from './photo-navigation';

const viewerButtonClassName =
  'landing-control rounded-control border-line bg-surface text-ink hover:bg-landing-accent hover:text-surface pointer-events-auto size-11 cursor-pointer transition-none';

type CategoryPhotoViewerProps = Pick<Category, 'images' | 'title'> & {
  index: number;
  position: string;
  onStep: PhotoTrackNavigation['step'];
  onClose: () => void;
};

export function CategoryPhotoViewer({
  images,
  title,
  index,
  position,
  onStep,
  onClose,
}: CategoryPhotoViewerProps) {
  const track = useRef<PhotoTrackNavigation>(null);
  const hasMultipleImages = images.length > 1;

  return (
    <SheetContent
      side="bottom"
      showCloseButton={false}
      className="landing-dialog bg-ink text-surface top-0 grid grid-rows-[3.5rem_minmax(0,1fr)_3.5rem] px-3 shadow-none data-[side=bottom]:h-dvh data-[side=bottom]:border-t-0 data-[side=bottom]:data-ending-style:translate-y-0 data-[side=bottom]:data-starting-style:translate-y-0 sm:px-5"
      onKeyDown={(event) => {
        if (hasMultipleImages) navigateWithArrowKeys(event, track.current);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="pointer-events-none flex min-w-0 items-center justify-between gap-4">
        <SheetTitle className="text-surface min-w-0 truncate">
          {title}
        </SheetTitle>
        <SheetClose
          aria-label="Закрыть просмотр фото"
          render={
            <Button
              variant="secondary"
              size="icon-lg"
              className={viewerButtonClassName}
            />
          }
        >
          <X aria-hidden="true" />
        </SheetClose>
      </div>
      <CategoryPhotoTrack
        images={images}
        title={title}
        index={index}
        ref={track}
        view="fullscreen"
        onStep={onStep}
      />
      {hasMultipleImages ? (
        <div className="pointer-events-none flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="icon-lg"
            aria-label="Предыдущее фото"
            className={viewerButtonClassName}
            onClick={() => {
              track.current?.step(-1);
            }}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <span role="status" className="font-mono tabular-nums">
            {position}
          </span>
          <Button
            variant="secondary"
            size="icon-lg"
            aria-label="Следующее фото"
            className={viewerButtonClassName}
            onClick={() => {
              track.current?.step(1);
            }}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </SheetContent>
  );
}
