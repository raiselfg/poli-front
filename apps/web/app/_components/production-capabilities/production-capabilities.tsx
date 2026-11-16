import { DraftingCompass, Truck } from 'lucide-react';
import { wrap } from '../landing-styles';

const capabilities = [
  { value: '3', label: 'Линии производства' },
  { value: '800', unit: 'м²', label: 'Склад сырья и готовой продукции' },
  { prefix: 'до', value: '20', unit: 'т', label: 'Изделий в месяц' },
  { icon: DraftingCompass, label: 'Конструктор\u00ADское бюро' },
  { icon: Truck, label: 'Доставка по России и СНГ' },
];

export function ProductionCapabilities() {
  return (
    <section
      aria-labelledby="production-capabilities-title"
      className={`${wrap} landing:pb-20 pb-12`}
    >
      <h2
        id="production-capabilities-title"
        className="tracking-heading mb-5 text-2xl leading-tight font-extrabold text-balance sm:mb-7 sm:text-3xl"
      >
        Производственные возможности
      </h2>
      <ul
        role="list"
        className="landing:grid-cols-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {capabilities.map(({ icon: Icon, label, prefix, value, unit }) => (
          <li
            key={label}
            className="rounded-panel border-line from-surface to-landing-accent/8 landing:last:col-span-1 flex min-h-36 min-w-0 flex-col justify-between gap-4 border bg-linear-to-br p-3.5 shadow-sm last:col-span-2 sm:min-h-42 sm:p-5"
          >
            {Icon !== undefined ? (
              <span className="rounded-control bg-landing-accent/10 text-landing-accent grid size-12 place-items-center">
                <Icon size={27} aria-hidden="true" />
              </span>
            ) : (
              <div className="text-landing-accent flex items-baseline gap-1.5 font-mono leading-none font-bold">
                {prefix !== undefined && (
                  <span className="text-xs">{prefix}</span>
                )}
                <span className="text-[clamp(2rem,5vw,3.5rem)] tracking-tight">
                  {value}
                </span>
                {unit !== undefined && <span className="text-sm">{unit}</span>}
              </div>
            )}
            <span className="text-ink text-sm leading-snug font-bold wrap-anywhere">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
