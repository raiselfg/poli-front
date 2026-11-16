import { cn } from '@workspace/ui/lib/utils';
import { heading, wrap } from '../landing-styles';
import { industryIllustrations as illustrations } from './industry-illustrations';

const industries = [
  {
    title: 'Горнодобывающая отрасль',
    illustration: illustrations.mining,
    layout: 'landing:col-span-2 landing:row-span-2',
    featured: true,
  },
  {
    title: 'Автозапчасти из полиуретана',
    illustration: illustrations.automotive,
    layout: 'landing:col-span-2',
  },
  { title: 'Порты и причалы', illustration: illustrations.ports },
  { title: 'Аграрный сектор', illustration: illustrations.agriculture },
  {
    title: 'Нефтегазовое оборудование',
    illustration: illustrations.oilAndGas,
    layout: 'landing:col-span-2',
  },
  { title: 'Конвейерные системы', illustration: illustrations.conveyors },
  {
    title: 'Промышленное оборудование',
    illustration: illustrations.equipment,
  },
  {
    title: 'Строительная техника',
    illustration: illustrations.construction,
    layout:
      'landing:col-span-2 landing:col-start-3 landing:row-span-2 landing:row-start-3',
    featured: true,
  },
];

export function Industries() {
  return (
    <section
      aria-labelledby="industries-title"
      className={`${wrap} pb-section`}
    >
      <h2 id="industries-title" className={`${heading} mb-6 max-w-4xl sm:mb-9`}>
        Полиуретановые изделия для разных отраслей
      </h2>
      <ul
        role="list"
        className="landing:grid-cols-4 landing:grid-rows-[18rem_13rem_18rem_13rem] grid gap-3 sm:grid-cols-2 sm:gap-4"
      >
        {industries.map(({ title, illustration, layout, featured }) => (
          <li
            key={title}
            className={cn(
              'rounded-panel flex min-w-0 flex-col overflow-hidden border bg-linear-to-br shadow-sm',
              featured === true
                ? 'border-line-dark from-ink text-surface to-[#21403e] [--drawing-dark:#232e30] [--drawing-light:#80a9a4] [--drawing-mid:#346d68]'
                : 'border-line from-surface to-landing-accent/10 [--drawing-dark:#91b8b4] [--drawing-light:var(--landing-surface)] [--drawing-mid:#c6deda]',
              layout
            )}
          >
            <div
              className={cn(
                'relative grid min-h-0 flex-1 place-items-center overflow-hidden px-4 pt-4',
                featured === true
                  ? 'text-landing-accent-light'
                  : 'text-landing-accent'
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] mask-[radial-gradient(ellipse,#000_25%,transparent_80%)] bg-size-[18px_18px] opacity-15"
              />
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 360 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="landing:h-full relative h-40 w-full max-w-md sm:h-44"
              >
                {illustration}
              </svg>
            </div>
            <p
              className={cn(
                'px-4 pt-2 pb-4 leading-snug font-bold wrap-anywhere sm:px-5 sm:pb-5',
                layout !== undefined && 'landing:text-xl'
              )}
            >
              {title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
