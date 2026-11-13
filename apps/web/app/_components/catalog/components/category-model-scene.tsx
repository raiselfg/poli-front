'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const columns = 6;
const rows = 5;
const lastFrame = columns * rows - 1;

export function CategoryModelScene({ path }: { path: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: viewport,
    offset: ['start end', 'end start'],
  });
  const transform = useTransform(scrollYProgress, (progress) => {
    const index = Math.round(progress * lastFrame);
    const x = (-100 * (index % columns)) / columns;
    const y = (-100 * Math.floor(index / columns)) / rows;
    return `translate(${String(x)}%, ${String(y)}%)`;
  });

  return (
    <div
      ref={viewport}
      aria-hidden="true"
      data-ready={ready}
      className="peer/animation pointer-events-none absolute inset-0 overflow-hidden opacity-0 data-[ready=true]:opacity-100 motion-reduce:hidden"
    >
      <motion.div
        className="absolute top-0 left-0 h-[500%] w-[600%] will-change-transform"
        style={{ transform }}
      >
        <Image
          src={`${path}-frames.webp`}
          alt=""
          fill
          unoptimized
          loading="eager"
          onLoad={() => {
            setReady(true);
          }}
        />
      </motion.div>
    </div>
  );
}
