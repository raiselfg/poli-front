'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const ShaderCanvas = dynamic(() => import('./shader-canvas'), { ssr: false });

export function HeroShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (
      container === null ||
      connection?.saveData === true ||
      navigator.hardwareConcurrency <= 2
    )
      return;

    let intersecting = false;
    const update = () => {
      setVisible(intersecting && !motion.matches && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      update();
    });
    observer.observe(container);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-65"
      aria-hidden="true"
    >
      {visible && (
        <ShaderCanvas
          webgpu={'gpu' in navigator && !unavailable}
          onUnavailable={() => {
            setUnavailable(true);
          }}
        />
      )}
    </div>
  );
}
