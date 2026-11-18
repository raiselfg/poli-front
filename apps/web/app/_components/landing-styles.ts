import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

export const wrap = 'mx-auto w-full max-w-landing px-5 sm:px-8 landing:px-10';
export const catalogFooterWrap =
  'mx-auto w-[min(100%-96px,1320px)] max-[900px]:w-[min(100%-48px,1320px)] max-[700px]:w-[calc(100%-36px)]';
export const heading =
  'text-section-heading leading-none font-extrabold tracking-heading text-balance';
export const action = cn(
  buttonVariants(),
  'landing-control rounded-control bg-ink text-surface hover:bg-landing-accent hover:text-on-dark min-h-12 gap-3 px-4 font-bold transition-none'
);
export const accentAction = cn(
  buttonVariants(),
  'landing-control rounded-control bg-landing-accent text-on-dark hover:bg-ink hover:text-surface min-h-11 gap-2 px-4 font-bold transition-none'
);
export const textLink =
  'landing-link inline-flex min-h-11 items-center gap-2 font-bold underline decoration-landing-accent decoration-2 underline-offset-6 hover:decoration-current';
