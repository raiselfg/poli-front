import { Suspense } from 'react';
import Link from 'next/link';
import { copyrightYear, legalLinks, operator } from '@/lib/legal';
import { heading, wrap } from '../landing-styles';
import { ContactDetails } from './components/contact-details';
import { ContactReveal } from './components/contact-reveal';
import { ContactsSkeleton } from './components/contacts-skeleton';

const steps = [
  {
    title: 'Напишите или позвоните',
    text: 'Фото, чертёж, ТЗ и описание детали можно прислать по желанию на почту или в мессенджер.',
  },
  {
    title: 'Уточним размеры и материал',
    text: 'Зададим вопросы по детали и объёму заказа.',
  },
  {
    title: 'Посчитаем стоимость',
    text: 'После уточнения деталей и объёма.',
  },
];

export function SiteFooter() {
  return (
    <footer id="contacts" className="scroll-mt-6 pt-[85px] pb-[25px]">
      <div className={wrap}>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-[50px] pb-[100px] max-[900px]:grid-cols-1 max-[900px]:gap-[45px] max-[900px]:pb-[70px] min-[900px]:items-center min-[900px]:pt-[26px]">
          <div className="max-w-[480px]">
            <h2 className={`${heading} min-[900px]:mt-0`}>Контакты</h2>
            <p className="mt-[30px] text-[length:calc(16px*var(--text-scale))] leading-[1.65] text-zinc-600">
              Производство в Санкт-Петербурге. Напишите или позвоните — обсудим
              деталь, уточним размеры и материал, посчитаем стоимость.
            </p>
            <p className="mt-9 text-[length:calc(15px*var(--text-scale))] font-semibold text-zinc-900">
              Как оформить заказ
            </p>
            <ol className="mt-3 border-t border-zinc-300">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 border-b border-zinc-300 py-4"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-zinc-300 text-[length:calc(12px*var(--text-scale))] font-semibold text-zinc-700"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[length:calc(14px*var(--text-scale))] leading-snug font-semibold text-zinc-900">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[length:calc(13px*var(--text-scale))] leading-[1.5] text-zinc-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <ContactReveal>
            <Suspense fallback={<ContactsSkeleton />}>
              <ContactDetails />
            </Suspense>
          </ContactReveal>
        </div>
        <div className="border-t border-zinc-300 pt-[22px]">
          <nav
            aria-label="Юридическая информация"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[length:calc(12px*var(--text-scale))] font-medium text-zinc-700 max-[700px]:text-[length:calc(11px*var(--text-scale))]"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-zinc-950 focus-visible:text-zinc-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-3 max-w-[760px] text-[length:calc(11px*var(--text-scale))] leading-[1.6] text-zinc-600">
            Информация на сайте носит справочный характер и не является
            публичной офертой (ст. 437 ГК РФ). Стоимость и сроки изготовления
            рассчитываются по запросу.
          </p>
          <div className="mt-5 flex flex-wrap justify-between gap-4 text-[length:calc(10px*var(--text-scale))] font-[650] tracking-[0.1em] text-zinc-700 max-[700px]:text-[length:calc(9px*var(--text-scale))]">
            <span className="max-[700px]:max-w-[220px]">
              ПРОИЗВОДСТВО ПОЛИУРЕТАНОВЫХ ИЗДЕЛИЙ · САНКТ-ПЕТЕРБУРГ
            </span>
            <span>
              © {copyrightYear} {operator.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
