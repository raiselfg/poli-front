import { Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  AnimatedCopy,
  AnimatedDescription,
  AnimatedPhrase,
} from '../animated-phrase';
import {
  heading,
  textLink,
  wordReveal,
  serifHighlight,
  wrap,
} from '../landing-styles';
import { TextAnimate } from '../magic-ui/text-animate';
import { CatalogList } from './components/catalog-list';
import { CatalogSkeleton } from './components/catalog-skeleton';

export function Catalog() {
  return (
    <section
      id="catalog"
      className={`${wrap} scroll-mt-6 py-[145px] max-[700px]:py-[95px]`}
    >
      <AnimatedCopy className="mb-20 grid grid-cols-[1fr_330px] items-end gap-[50px] max-[700px]:mb-[45px] max-[700px]:grid-cols-1 max-[700px]:gap-[25px]">
        <div>
          <h2 className={heading}>
            Форма следует
            <br />
            <TextAnimate
              as="span"
              by="word"
              startOnView={false}
              delay={0.05}
              duration={0.6}
              animate={undefined}
              variants={wordReveal}
              className="text-[#285f80] motion-reduce:opacity-100!"
              segmentClassName="motion-reduce:opacity-100! motion-reduce:transform-none! motion-reduce:filter-none!"
            >
              за задачей.
            </TextAnimate>
          </h2>
        </div>
        <div className="pt-[17px]">
          <AnimatedDescription className="mt-[30px] mb-[18px] text-[16px] leading-[1.65] text-[#36566c] max-[700px]:mt-[18px] max-[700px]:mb-[10px]">
            Изделия из полиуретана для разных задач. Нужна особая деталь?{' '}
            <AnimatedPhrase className={serifHighlight} effect="marker">
              Изготовим по вашему чертежу.
            </AnimatedPhrase>
          </AnimatedDescription>
          <a
            href="#custom"
            className={`${textLink} group/drawing-link relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2px] after:origin-left after:bg-[#4389ad] after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 focus-visible:after:opacity-100 motion-safe:after:scale-x-0 motion-safe:after:transition-[scale,opacity] motion-safe:hover:after:scale-x-100 motion-safe:focus-visible:after:scale-x-100`}
          >
            Изготовление по чертежам
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="motion-safe:transition-[translate] motion-safe:duration-300 motion-safe:ease-in-out motion-safe:group-hover/drawing-link:translate-x-1.5 motion-safe:group-focus-visible/drawing-link:translate-x-1.5"
            />
          </a>
        </div>
      </AnimatedCopy>
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogList />
      </Suspense>
    </section>
  );
}
