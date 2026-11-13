'use client';

import Image from 'next/image';
import { useRef, useState, useSyncExternalStore, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const columns = 6;
const rows = 5;
const lastFrame = columns * rows - 1;
const stickyViewport = '(min-height: 620px)';

function subscribeToViewport(onChange: () => void) {
  const query = window.matchMedia(stickyViewport);
  query.addEventListener('change', onChange);
  return () => {
    query.removeEventListener('change', onChange);
  };
}

function isStickyViewport() {
  return window.matchMedia(stickyViewport).matches;
}

export function CategoryModelScene({
  path,
  story,
}: {
  path: string;
  story: RefObject<HTMLElement | null> | null;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const tallEnough = useSyncExternalStore(
    subscribeToViewport,
    isStickyViewport,
    () => false
  );
  const pinned = story !== null && tallEnough;
  const { scrollYProgress } = useScroll({
    target: pinned ? story : viewport,
    offset: pinned ? ['start 96px', 'end end'] : ['start end', 'end start'],
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
