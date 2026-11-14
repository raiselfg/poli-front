'use client';

import { motion, type Variants } from 'motion/react';

// Adapted from Aceternity UI's Colourful Text for a single viewport reveal.
const colors = ['#18181b', '#3f3f46', '#27272a', '#52525b'];
const letter: Variants = {
  hidden: { opacity: 0 },
  show: (index: number) => ({
    opacity: 1,
    color: ['#27272a', colors[index % colors.length], '#27272a'],
    y: [0, -12, 0],
    transition: {
      duration: 0.62,
      delay: 0.11 + index * 0.035,
      ease: 'easeInOut',
    },
  }),
};

export function ColourfulText({ text }: { text: string }) {
  return (
    <motion.span
      variants={{ show: {} }}
      className="inline-block whitespace-nowrap text-zinc-800"
    >
      <span className="sr-only">{text}</span>
      {Array.from(text, (character, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letter}
          aria-hidden="true"
          className="inline-block motion-reduce:transform-none! motion-reduce:opacity-100!"
        >
          {character}
        </motion.span>
      ))}
    </motion.span>
  );
}
