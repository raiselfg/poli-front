import { Box, Calculator, Files, Users } from 'lucide-react';
import { wrap } from '../landing-styles';

const terms = [
  {
    icon: Files,
    title: 'Чертёж не обязателен',
    text: 'Подойдёт эскиз, образец или фото.',
  },
  {
    icon: Box,
    title: 'Подберём материал',
    text: 'Уточним размеры и подберём полиуретан.',
  },
  {
    icon: Calculator,
    title: 'Цена по запросу',
    text: 'После уточнения деталей и объёма.',
  },
  {
    icon: Users,
    title: 'Для предприятий и частных лиц',
    text: 'Работаем с юрлицами и частными заказчиками.',
  },
];

export function OrderTerms() {
  return (
    <section
      aria-label="Условия заказа"
      className="bg-dark-panel text-on-dark border-line-dark border-y py-8 sm:py-12 lg:py-16"
    >
      <dl className={`${wrap} landing:grid-cols-4 grid gap-4 sm:grid-cols-2`}>
        {terms.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-panel border-on-dark/15 from-landing-accent/25 to-on-dark/5 min-w-0 border bg-linear-to-br p-5 shadow-[0_12px_24px_rgb(0_0_0/24%),inset_0_1px_0_rgb(255_255_255/8%)] sm:min-h-56 xl:p-6"
          >
            <Icon
              aria-hidden="true"
              className="rounded-control bg-landing-accent text-on-dark mb-5 size-11 p-2.5"
            />
            <dt className="text-landing-accent-light text-xl leading-snug font-bold wrap-anywhere hyphens-auto xl:text-2xl">
              {title}
            </dt>
            <dd className="text-ink-on-dark-muted mt-2.5 text-sm leading-relaxed">
              {text}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
