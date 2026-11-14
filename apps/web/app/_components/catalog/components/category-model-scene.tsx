'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const columns = 10;
const rows = 10;
const lastFrame = columns * rows - 1;

function frameTransform(index: number) {
  const x = (-100 * (index % columns)) / columns;
  const y = (-100 * Math.floor(index / columns)) / rows;
  return `translate(${String(x)}%, ${String(y)}%)`;
}

export function CategoryModelScene({ path }: { path: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: viewport,
    offset: ['start end', 'end start'],
  });
  const frame = useTransform(scrollYProgress, [0, 1], [0, lastFrame]);
  const evenTransform = useTransform(frame, (value) =>
    frameTransform(Math.min(lastFrame - 1, 2 * Math.floor((value + 1) / 2)))
  );
  const oddTransform = useTransform(frame, (value) =>
    frameTransform(2 * Math.floor(value / 2) + 1)
  );
  // A layer changes its sprite position only when its opacity reaches zero.
  const evenOpacity = useTransform(frame, (value) => Math.abs((value % 2) - 1));
  const oddOpacity = useTransform(evenOpacity, (value) => 1 - value);

  return (
    <div
      ref={viewport}
      aria-hidden="true"
      data-ready={ready}
      className="peer/animation pointer-events-none absolute inset-0 isolate overflow-hidden opacity-0 data-[ready=true]:opacity-100 motion-reduce:hidden"
    >
      {[
        { transform: evenTransform, opacity: evenOpacity, blend: '' },
        {
          transform: oddTransform,
          opacity: oddOpacity,
          blend: 'mix-blend-plus-lighter',
        },
      ].map(({ transform, opacity, blend }) => (
        <motion.div
          key={blend}
          className={`absolute inset-0 overflow-hidden will-change-[opacity] ${blend}`}
          style={{ opacity }}
        >
          <motion.div
            className="absolute top-0 left-0 h-[1000%] w-[1000%] will-change-transform"
            style={{ transform }}
          >
            <picture>
              <source srcSet={`${path}-frames.avif`} type="image/avif" />
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
            </picture>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
