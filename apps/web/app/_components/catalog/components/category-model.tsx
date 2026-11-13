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
  const nearViewport = useInView(viewport, { margin: '240px' });
  const reduceMotion = useReducedMotion();
  const animate = nearViewport && reduceMotion !== true;
  const path = `/category-models/${model}`;

  return (
    <>
      <div
        ref={viewport}
        className="relative aspect-square w-[84%] max-w-[440px] max-[900px]:max-w-[360px] max-[700px]:max-w-[295px]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-[18%] bottom-[7%] h-[14%] bg-[radial-gradient(ellipse_at_center,#34556530_0%,transparent_72%)]"
        />
        {animate && <CategoryModelScene path={path} />}
        <Image
          src={`${path}-hd.webp`}
          alt={`3D-иллюстрация категории «${title}»`}
          fill
          unoptimized
          className="peer-data-[ready=true]/animation:opacity-0 motion-reduce:opacity-100"
        />
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-[22px] left-[22px] text-[11px] text-[#527587]"
      >
        3D-иллюстрация
      </span>
    </>
  );
}
