'use client';

import Image from 'next/image';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  type PointerEvent,
  type Ref,
} from 'react';
import { cn } from '@workspace/ui/lib/utils';
import type { Category } from '../../../_lib/catalog/catalog-schema';

const slideOffsets = [-1, 0, 1];
const dragSlop = 8;

export type PhotoTrackNavigation = {
  step: (direction: -1 | 1) => void;
};

type PhotoTrackProps = Pick<Category, 'images' | 'title'> & {
  index: number;
  view: 'card' | 'fullscreen';
  onStep: PhotoTrackNavigation['step'];
  ref: Ref<PhotoTrackNavigation>;
};

export function CategoryPhotoTrack({
  images,
  title,
  index,
  view,
  onStep,
  ref,
}: PhotoTrackProps) {
  const stage = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const start = useRef<{ x: number; y: number; dragging: boolean } | null>(
    null
  );
  const suppressClick = useRef(false);
  const fullscreen = view === 'fullscreen';

  useLayoutEffect(() => {
    x.jump(0);
    return () => {
      x.stop();
    };
  }, [index, x]);

  function settle(direction: -1 | 0 | 1, width: number) {
    void animate(x, -direction * width, {
      duration: reduceMotion === true ? 0 : direction === 0 ? 0.28 : 0.42,
      ease: [0.22, 0.8, 0.35, 1],
      onComplete: () => {
        if (direction !== 0) onStep(direction);
      },
    });
  }

  useImperativeHandle(ref, () => ({
    step(direction) {
      const width = stage.current?.clientWidth ?? 0;
      if (width > 0 && !x.isAnimating() && start.current?.dragging !== true) {
        settle(direction, width);
      }
    },
  }));

  function cancelDrag() {
    const dragging = start.current?.dragging === true;
    start.current = null;
    if (dragging) settle(0, 0);
  }

  function startDrag(event: PointerEvent<HTMLSpanElement>) {
    suppressClick.current = x.isAnimating();
    if (
      images.length < 2 ||
      event.pointerType !== 'touch' ||
      !event.isPrimary ||
      x.isAnimating()
    ) {
      cancelDrag();
      return;
    }

    start.current = { x: event.clientX, y: event.clientY, dragging: false };
  }

  function moveDrag(event: PointerEvent<HTMLSpanElement>) {
    const gesture = start.current;
    if (gesture === null || event.pointerType !== 'touch' || !event.isPrimary)
      return;

    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < dragSlop) return;
      if (Math.abs(dy) >= Math.abs(dx)) {
        start.current = null;
        return;
      }
      gesture.dragging = true;
      suppressClick.current = true;
    }

    if (reduceMotion === true) return;

    const width = event.currentTarget.clientWidth;
    x.set(Math.max(-width, Math.min(width, dx)));
  }

  function endDrag(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== 'touch' || !event.isPrimary) return;

    const gesture = start.current;
    start.current = null;
    if (gesture?.dragging !== true) return;

    const width = event.currentTarget.clientWidth;
    const displacement = event.clientX - gesture.x;
    const direction =
      Math.abs(displacement) >= Math.min(56, width / 5)
        ? displacement < 0
          ? 1
          : -1
        : 0;
    settle(direction, width);
  }

  const offsets = images.length > 1 ? slideOffsets : [0];

  return (
    <span
      ref={stage}
      className={cn(
        'touch-pan-y touch-pinch-zoom overflow-hidden',
        fullscreen ? 'pointer-events-none relative min-h-0' : 'absolute inset-0'
      )}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={cancelDrag}
      onClickCapture={(event) => {
        if (suppressClick.current && event.detail > 0) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      <motion.span className="absolute inset-0" style={{ x }}>
        {offsets.map((offset) => {
          const image = images.at(
            (index + offset + images.length) % images.length
          );
          if (image === undefined) return null;
          const alt = image.alt?.trim() ?? '';

          return (
            <span
              key={offset}
              aria-hidden={offset !== 0 ? true : undefined}
              className={cn(
                'absolute inset-0',
                fullscreen && 'flex items-center justify-center',
                offset < 0 && '-translate-x-full',
                offset > 0 && 'translate-x-full'
              )}
            >
              <Image
                src={image.url}
                alt={
                  offset === 0
                    ? alt !== ''
                      ? alt
                      : `${title}, фото ${String(index + 1)}`
                    : ''
                }
                width={fullscreen ? (image.width ?? 1200) : undefined}
                height={fullscreen ? (image.height ?? 900) : undefined}
                fill={!fullscreen}
                unoptimized
                draggable={false}
                className={cn(
                  fullscreen
                    ? 'h-auto max-h-full w-auto max-w-full cursor-default'
                    : 'object-contain',
                  fullscreen && offset === 0 && 'pointer-events-auto'
                )}
              />
            </span>
          );
        })}
      </motion.span>
    </span>
  );
}
