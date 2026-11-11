'use client';

import { motion } from 'motion/react';
import { FlowingGradient, Shader } from 'shaders/react';

export default function ShaderCanvas({
  onUnavailable,
  webgpu,
}: {
  onUnavailable: () => void;
  webgpu: boolean;
}) {
  return (
    <>
      {webgpu && (
        <Shader
          className="size-full"
          onUnavailable={onUnavailable}
          disableTelemetry
        >
          <FlowingGradient
            colorA="#f8fdff"
            colorB="#d7effa"
            colorC="#eefaff"
            colorD="#cbe8f6"
            speed={0.12}
            distortion={0.25}
          />
        </Shader>
      )}
      <motion.span
        className="pointer-events-none absolute top-[21%] right-[9%] aspect-square w-[26%] rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255_/_90%),rgb(169_219_240_/_42%)_55%,rgb(126_190_220_/_20%))] shadow-[inset_-12px_-16px_28px_rgb(95_160_194_/_15%),0_12px_30px_rgb(96_160_191_/_14%)]"
        animate={{ x: [0, 18, 0], y: [0, -14, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.span
        className="pointer-events-none absolute bottom-[17%] left-[12%] aspect-square w-[13%] rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255_/_90%),rgb(169_219_240_/_42%)_55%,rgb(126_190_220_/_20%))] shadow-[inset_-12px_-16px_28px_rgb(95_160_194_/_15%),0_12px_30px_rgb(96_160_191_/_14%)]"
        animate={{ x: [0, -16, 0], y: [0, 18, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.span
        className="pointer-events-none absolute top-[16%] left-[16%] aspect-square w-[68%] rounded-full border border-dashed border-[rgb(91_157_188_/_45%)]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      />
    </>
  );
}
