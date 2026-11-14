'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { CategoryModelScene } from './category-model-scene';

type CategoryModelProps = {
  model: string;
  title: string;
};

export function CategoryModel({ model, title }: CategoryModelProps) {
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
      {animate && <CategoryModelScene path={path} />}
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
