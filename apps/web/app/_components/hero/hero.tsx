import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ColourfulText } from '../aceternity-ui/colourful-text';
import {
  AnimatedCopy,
  AnimatedDescription,
  AnimatedPhrase,
} from '../animated-phrase';
import { action, textLink, serifHighlight, wrap } from '../landing-styles';

export function Hero() {
  return (
    <section
      className={`${wrap} scroll-mt-6 pt-[22px]`}
      aria-labelledby="hero-title"
    >
      <div className="pt-[45px] pb-[30px] max-[700px]:pt-[15px] max-[700px]:pb-5">
        <AnimatedCopy className="mx-auto flex max-w-[800px] flex-col items-center justify-center py-20 text-center max-[700px]:pt-[35px] max-[700px]:pb-5">
          <h1
            id="hero-title"
            className="my-[30px] text-[clamp(38px,4.8vw,72px)] leading-[0.98] font-[600] tracking-[-0.045em] max-[700px]:my-[25px] max-[700px]:text-[clamp(38px,10vw,68px)]"
          >
            Изделия из
            <br />
            <ColourfulText text="полиуретана." />
          </h1>
          <AnimatedDescription
            effect="focus"
            className="max-w-[440px] text-[17px] leading-[1.6] text-[#36566c] max-[700px]:text-[15px]"
          >
            Изготавливаем изделия из полиуретана, в том числе{' '}
            <AnimatedPhrase
              className={`${serifHighlight} italic`}
              effect="underline"
            >
              по вашим чертежам
            </AnimatedPhrase>{' '}
            и техническим требованиям.
          </AnimatedDescription>
          <div className="mt-[38px] flex flex-wrap items-center justify-center gap-7 max-[700px]:mt-7 max-[700px]:gap-[18px]">
            <a
              className={`${action} group/hero-action rounded-full motion-safe:transition-[translate,background-color,box-shadow] motion-safe:duration-400 motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-[0_16px_28px_rgb(36_91_120_/_30%)] motion-safe:focus-visible:-translate-y-1.5 motion-safe:focus-visible:shadow-[0_16px_28px_rgb(36_91_120_/_30%)]`}
              href="#request"
            >
              Отправить заявку
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="motion-safe:transition-[translate] motion-safe:duration-400 motion-safe:ease-out motion-safe:group-hover/hero-action:translate-x-1 motion-safe:group-hover/hero-action:-translate-y-1 motion-safe:group-focus-visible/hero-action:translate-x-1 motion-safe:group-focus-visible/hero-action:-translate-y-1"
              />
            </a>
            <a className={`${textLink} group/catalog-link`} href="#catalog">
              Смотреть продукцию
              <ArrowDown
                size={17}
                aria-hidden="true"
                className="motion-safe:transition-[translate] motion-safe:duration-300 motion-safe:ease-in-out motion-safe:group-hover/catalog-link:translate-y-1.5 motion-safe:group-focus-visible/catalog-link:translate-y-1.5"
              />
            </a>
          </div>
        </AnimatedCopy>
      </div>
    </section>
  );
}
