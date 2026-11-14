export const wrap =
  'mx-auto w-[min(100%-96px,1320px)] max-[900px]:w-[min(100%-48px,1320px)] max-[700px]:w-[calc(100%-36px)]';
export const heading =
  'mt-[26px] mb-0 text-[length:calc(clamp(46px,5vw,72px)*var(--text-scale))] leading-[0.98] font-medium tracking-[-0.045em] max-[700px]:text-[length:calc(clamp(43px,10vw,62px)*var(--text-scale))]';
export const action =
  'inline-flex min-h-[58px] items-center justify-between gap-[45px] bg-[#326f91] px-[21px] py-[19px] text-[length:calc(13px*var(--text-scale))] font-[650] text-white shadow-[0_9px_20px_rgb(50_111_145_/_18%)] hover:bg-[#245b78] transition-colors duration-300 ease-in-out focus-visible:bg-[#245b78] max-[700px]:min-h-[54px]';
export const textLink =
  'inline-flex items-center gap-5 border-b border-current py-[10px] text-[length:calc(13px*var(--text-scale))] font-[650] transition-colors duration-300 hover:text-[#286686] focus-visible:text-[#286686]';

export const phraseHighlight = 'font-bold text-[#482d56]';
export const serifHighlight = 'font-accent font-semibold text-[#482d56]';

export const wordReveal: import('motion/react').Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.56, ease: 'easeOut' },
  },
};

export const lineReveal: import('motion/react').Variants = {
  hidden: { clipPath: 'inset(-15% 100% -20% -5%)' },
  show: {
    clipPath: 'inset(-15% -5% -20% -5%)',
    transition: { duration: 0.9, ease: 'easeInOut' },
  },
};
