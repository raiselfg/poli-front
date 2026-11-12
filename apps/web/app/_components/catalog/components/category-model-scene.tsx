'use client';

import { useEffect, useRef, useState } from 'react';
import { cancelFrame, frame, useScroll, useSpring } from 'motion/react';
import type { CategoryModelName } from './category-model-renderer';
import type {
  CategoryModelCommand,
  CategoryModelEvent,
} from './category-model-worker';

const maxRenderSize = 512;

export function CategoryModelScene({ model }: { model: CategoryModelName }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: viewport,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 26 });

  useEffect(() => {
    const element = viewport.current;
    if (element === null) return;

    const canvas = document.createElement('canvas');
    if (typeof canvas.transferControlToOffscreen !== 'function') return;

    let worker: Worker;
    try {
      worker = new Worker(
        new URL('./category-model-worker.ts', import.meta.url)
      );
    } catch {
      return;
    }
    const send = (
      command: CategoryModelCommand,
      transfer: Transferable[] = []
    ) => {
      worker.postMessage(command, transfer);
    };
    try {
      const offscreen = canvas.transferControlToOffscreen();
      send({ type: 'init', canvas: offscreen, model }, [offscreen]);
    } catch {
      worker.terminate();
      return;
    }

    canvas.className = 'block size-full';
    element.append(canvas);

    let visible = false;
    let busy = true;
    let available = true;
    let presented = false;
    let size = 0;
    let previousSize = 0;
    let previousProgress = -1;
    const draw = () => {
      if (!available || !visible || busy || size === 0) return;
      const value = Math.max(0, Math.min(progress.get(), 1));
      if (value === previousProgress && size === previousSize) return;

      // Let the worker finish before sending the newest scroll position.
      busy = true;
      previousProgress = value;
      previousSize = size;
      send({ type: 'render', progress: value, size });
    };
    const scheduleDraw = () => {
      if (available && visible && !busy) frame.render(draw);
    };
    const stop = () => {
      available = false;
      worker.terminate();
      setReady(false);
    };
    worker.onerror = stop;
    worker.onmessage = ({ data }: MessageEvent<CategoryModelEvent>) => {
      if (data === 'unavailable') {
        stop();
        return;
      }
      if (data === 'rendered' && !presented) {
        presented = true;
        setReady(true);
      }
      busy = false;
      scheduleDraw();
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      size = Math.min(
        maxRenderSize,
        Math.round(
          entry.contentRect.width * Math.min(window.devicePixelRatio, 2)
        )
      );
      scheduleDraw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio > 0;
      scheduleDraw();
    });
    const unsubscribe = progress.on('change', scheduleDraw);
    resizeObserver.observe(element);
    visibilityObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      unsubscribe();
      cancelFrame(draw);
      worker.terminate();
      canvas.remove();
    };
  }, [model, progress]);

  return (
    <div
      ref={viewport}
      aria-hidden="true"
      data-ready={ready}
      className="peer/animation pointer-events-none absolute inset-0 opacity-0 data-[ready=true]:opacity-100 motion-reduce:hidden"
    />
  );
}
