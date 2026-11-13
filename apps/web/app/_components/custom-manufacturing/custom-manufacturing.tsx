import { ArrowDown } from 'lucide-react';
import { Highlight } from '../aceternity-ui/highlight';
import {
  AnimatedCopy,
  AnimatedDescription,
  AnimatedPhrase,
} from '../animated-phrase';
import { action, phraseHighlight, wrap } from '../landing-styles';

export function CustomManufacturing() {
  return (
    <section
      id="custom"
      aria-labelledby="custom-title"
      className={`${wrap} scroll-mt-6 py-20 text-[#213b50] max-[700px]:py-14`}
    >
      <AnimatedCopy className="group/custom relative isolate grid grid-cols-[1fr_minmax(0,320px)] items-center gap-x-12 gap-y-5 rounded-[32px] border border-white/80 bg-white/55 px-[clamp(24px,5vw,64px)] py-[clamp(28px,4vw,52px)] shadow-[0_20px_60px_rgb(79_141_174_/_12%)] max-[700px]:grid-cols-1">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
        >
          <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,#fff_50%,transparent_80%)] opacity-0 transition-opacity duration-500 group-focus-within/custom:opacity-60 group-hover/custom:opacity-60 motion-safe:-translate-x-1/4 motion-safe:transition-[translate,opacity] motion-safe:duration-1000 motion-safe:group-focus-within/custom:translate-x-1/4 motion-safe:group-hover/custom:translate-x-1/4" />
        </span>
        <h2
          id="custom-title"
          className="text-[clamp(32px,4.3vw,56px)] leading-[1.06] font-medium tracking-[-0.045em] max-[700px]:text-[clamp(30px,7.8vw,42px)]"
        >
          Чертёж
          <br />
          <Highlight className="from-[#92c6e9] to-[#c0b7e5] text-[#285f80]">
            не обязателен
          </Highlight>
        </h2>
        <div>
          <AnimatedDescription
            effect="wipe"
            className="mb-5 text-[16px] leading-[1.65] text-[#36566c]"
          >
            Пришлите фото детали и опишите, где она используется.{' '}
            <AnimatedPhrase className={phraseHighlight} effect="underline">
              Размеры и материал
            </AnimatedPhrase>{' '}
            уточним вместе.
          </AnimatedDescription>
          <a
            className={`${action} group/drawing-action gap-5 rounded-full`}
            href="#request"
          >
            Прислать фото
            <ArrowDown
              size={17}
              aria-hidden="true"
              className="motion-safe:transition-[translate] motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover/drawing-action:translate-y-1 motion-safe:group-focus-visible/drawing-action:translate-y-1"
            />
          </a>
        </div>
      </AnimatedCopy>
    </section>
  );
}
