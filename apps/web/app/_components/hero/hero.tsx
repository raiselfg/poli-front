import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Calculator,
  FileImage,
  Layers,
} from 'lucide-react';
import { ColourfulText } from '../aceternity-ui/colourful-text';
import {
  AnimatedCopy,
  AnimatedDescription,
  AnimatedPhrase,
} from '../animated-phrase';
import { action, textLink, serifHighlight, wrap } from '../landing-styles';

const products = [
  'Втулки',
  'Отбойники',
  'Демпферы',
  'Манжеты',
  'Детали по чертежу',
];

const facts = [
  {
    icon: FileImage,
    title: 'Чертёж не обязателен',
    text: 'Подойдёт эскиз, образец или фото.',
  },
  {
    icon: Layers,
    title: 'Подберём материал',
    text: 'Уточним размеры и подберём полиуретан.',
  },
  {
    icon: Calculator,
    title: 'Цена по запросу',
    text: 'После уточнения деталей и объёма.',
  },
  {
    icon: Building2,
    title: 'Для предприятий и частных лиц',
    text: 'Работаем с юрлицами и частными заказчиками.',
  },
];

export function Hero() {
  return (
    <section
      className={`${wrap} scroll-mt-6 pt-[22px]`}
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] items-center gap-x-[clamp(32px,5vw,72px)] gap-y-10 pt-10 pb-10 max-[900px]:grid-cols-1 max-[900px]:gap-y-8 max-[700px]:pt-3 max-[700px]:pb-8">
        <AnimatedCopy className="max-w-[620px]">
          <h1
            id="hero-title"
            className="text-[clamp(40px,4.5vw,68px)] leading-[0.98] font-[600] tracking-[-0.045em] max-[700px]:text-[clamp(36px,10vw,56px)]"
          >
            Изделия из
            <br />
            <ColourfulText text="полиуретана" />
          </h1>
          <AnimatedDescription
            effect="focus"
            className="mt-6 max-w-[470px] text-[17px] leading-[1.6] text-[#36566c] max-[700px]:mt-4 max-[700px]:text-[15px]"
          >
            Производим в Санкт-Петербурге втулки, отбойники, демпферы и манжеты
            —{' '}
            <AnimatedPhrase
              className={`${serifHighlight} italic`}
              effect="underline"
            >
              по чертежу, ТЗ или фотографии.
            </AnimatedPhrase>{' '}
            Подберём материал и уточним размеры.
          </AnimatedDescription>
          <ul
            aria-label="Ассортимент"
            className="mt-6 flex flex-wrap gap-2 max-[700px]:mt-5"
          >
            {products.map((product) => (
              <li
                key={product}
                className="rounded-full border border-[#d9e9f1] bg-white/60 px-3.5 py-1.5 text-[12px] leading-none font-medium text-[#4b6c80]"
              >
                {product}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 max-[700px]:mt-7">
            <a
              className={`${action} group/hero-action rounded-full motion-safe:transition-[translate,background-color,box-shadow] motion-safe:duration-400 motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-[0_16px_28px_rgb(36_91_120_/_30%)] motion-safe:focus-visible:-translate-y-1.5 motion-safe:focus-visible:shadow-[0_16px_28px_rgb(36_91_120_/_30%)] max-[700px]:w-full`}
              href="#request"
            >
              Прислать чертёж или фото
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
          <ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[#dbeaf1] pt-6 max-[900px]:grid-cols-1 max-[900px]:gap-y-3 max-[700px]:mt-7 max-[700px]:gap-y-4 max-[700px]:pt-5">
            {facts.map((fact) => (
              <li key={fact.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8f4fa] text-[#326f91]"
                >
                  <fact.icon size={17} />
                </span>
                <div>
                  <p className="text-[13px] leading-[1.35] font-semibold text-[#213b50]">
                    {fact.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-[1.45] text-[#607d8d]">
                    {fact.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </AnimatedCopy>
        <Image
          src="/images/polyurethane-workshop.webp"
          alt="Промышленный пресс с формой и полиуретановые заготовки в цехе"
          width={1120}
          height={1120}
          preload
          sizes="(max-width: 700px) min(100vw, 360px), (max-width: 900px) 480px, min(45vw, 560px)"
          className="mx-auto h-auto w-full max-w-[560px] rounded-[28px] max-[900px]:max-w-[480px] max-[700px]:max-w-[360px]"
        />
      </div>
    </section>
  );
}
