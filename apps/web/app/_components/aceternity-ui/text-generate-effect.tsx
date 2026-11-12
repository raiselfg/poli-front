'use client';

import { useState } from 'react';
import { motion, stagger, type Variants } from 'motion/react';
import { cn } from '@workspace/ui/lib/utils';

const sequence: Variants = {
  show: { transition: { delayChildren: stagger(0.2) } },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5 },
  },
};

function renderWords(text: string) {
  return text.split(' ').map((word, index) => (
    <motion.span
      key={`${word}-${index}`}
      variants={wordReveal}
      className="motion-reduce:opacity-100! motion-reduce:filter-none!"
    >
      {index > 0 ? ' ' : null}
      {word}
    </motion.span>
  ));
}

export function TextGenerateEffect({
  words,
  emphasis,
  emphasisClassName,
  className,
}: {
  words: string;
  emphasis: string;
  emphasisClassName: string;
  className?: string;
}) {
  const [emphasisRevealed, setEmphasisRevealed] = useState(false);

  return (
    <motion.p variants={sequence} className={className}>
      {renderWords(words)}{' '}
      <motion.strong
        variants={sequence}
        onAnimationComplete={() => setEmphasisRevealed(true)}
        className={cn(
          emphasisClassName,
          'bg-linear-to-r from-[#a9d9ee] to-[#d3bce9] box-decoration-clone bg-size-[0%_75%] bg-bottom-left bg-no-repeat motion-safe:transition-[background-size] motion-safe:duration-1000 motion-safe:ease-in-out',
          emphasisRevealed && 'bg-size-[100%_75%]'
        )}
      >
        {renderWords(emphasis)}
      </motion.strong>
    </motion.p>
  );
}
