'use client';

// Source: https://ui.aceternity.com/registry/hero-highlight.json
import { motion } from 'motion/react';
import { cn } from '@workspace/ui/lib/utils';

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, backgroundSize: '0% 50%' },
        show: { opacity: 1, backgroundSize: '100% 50%' },
      }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left 82%',
        display: 'inline-block',
      }}
      className={cn(
        'relative bg-linear-to-r motion-reduce:bg-size-[100%_50%]! motion-reduce:opacity-100!',
        className
      )}
    >
      {children}
    </motion.span>
  );
};
