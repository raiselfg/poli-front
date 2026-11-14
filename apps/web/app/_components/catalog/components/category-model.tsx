'use client';

import Image from 'next/image';
import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from 'motion/react';
import { CategoryModelScene } from './category-model-scene';

const CategoryStoryRef = createContext<RefObject<HTMLElement | null> | null>(
  null
);

export function CategoryStory({ children }: { children: ReactNode }) {
  const story = useRef<HTMLElement>(null);
  const { scrollYProgress: entryProgress } = useScroll({
    target: story,
    offset: ['start end', 'start 96px'],
  });
  const { scrollYProgress: exitProgress } = useScroll({
    target: story,
    offset: ['end end', 'end 96px'],
  });
  // Start at the lower edge, then restore vertical centering as the card pins.
  const entryOffset = useTransform(entryProgress, (progress) =>
    String((1 - progress) / 2)
  );
  const entryOpacity = useTransform(entryProgress, [0.28, 0.62], [0, 1]);
  const exitOpacity = useTransform(exitProgress, [0.28, 0.62], [1, 0]);
  const opacity = useTransform(() => entryOpacity.get() * exitOpacity.get());

  return (
    <article
      ref={story}
      className="group motion-safe:[@media(min-height:620px)]:after:block motion-safe:[@media(min-height:620px)]:after:h-[clamp(310px,55svh,550px)]"
    >
      <div className="motion-safe:[@media(min-height:620px)]:sticky motion-safe:[@media(min-height:620px)]:top-[96px] motion-safe:[@media(min-height:620px)]:grid motion-safe:[@media(min-height:620px)]:min-h-[calc(100dvh-96px)] motion-safe:[@media(min-height:620px)]:content-center">
        <motion.div
          style={
            {
              '--entry-offset': entryOffset,
              '--category-opacity': opacity,
            } as MotionStyle
          }
          className="focus-within:opacity-100! motion-safe:[@media(min-height:620px)]:translate-y-[min(0px,calc((100%_-_100dvh_+_96px)*var(--entry-offset)))] motion-safe:[@media(min-height:620px)]:opacity-(--category-opacity)"
        >
          <CategoryStoryRef value={story}>{children}</CategoryStoryRef>
        </motion.div>
      </div>
    </article>
  );
}

type CategoryModelProps = {
  model: string;
  title: string;
};

export function CategoryModel({ model, title }: CategoryModelProps) {
  const story = useContext(CategoryStoryRef);
  const viewport = useRef<HTMLDivElement>(null);
  // Give the atlas time to decode before the model enters the viewport.
  const nearViewport = useInView(viewport, { margin: '480px 0px' });
  const reduceMotion = useReducedMotion();
  const animate = nearViewport && reduceMotion !== true;
  const path = `/category-models/${model}`;

  return (
    <div
      ref={viewport}
      className="relative aspect-square w-[84%] max-w-[440px] max-[900px]:max-w-[360px] max-[700px]:max-w-[295px]"
    >
      {animate && <CategoryModelScene path={path} story={story} />}
      <Image
        src={`${path}-hd.webp`}
        alt={`3D-иллюстрация категории «${title}»`}
        fill
        unoptimized
        className="motion-safe:peer-data-[ready=true]/animation:opacity-0"
      />
    </div>
  );
}
