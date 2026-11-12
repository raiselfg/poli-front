'use client';

import { motion, type Variants } from 'motion/react';

// Adapted from Aceternity UI's Colourful Text for a single viewport reveal.
const colors = ['#195a78', '#314a91', '#663a79', '#22677b'];
const letter: Variants = {
  hidden: { opacity: 0 },
  show: (index: number) => ({
    opacity: 1,
    color: ['#285f80', colors[index % colors.length], '#285f80'],
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
      className="inline-block whitespace-nowrap text-[#285f80]"
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
