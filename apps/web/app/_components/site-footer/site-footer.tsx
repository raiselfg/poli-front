import { Suspense } from 'react';
import Link from 'next/link';
import { copyrightYear, legalLinks, operator } from '@/lib/legal';
import { heading, wrap } from '../landing-styles';
import { ContactDetails } from './components/contact-details';
import { ContactReveal } from './components/contact-reveal';
import { ContactsSkeleton } from './components/contacts-skeleton';

const steps = [
  {
    title: 'Пришлите чертёж, фото или ТЗ',
    text: 'На почту или в мессенджер — подойдёт файл или описание задачи.',
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
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-[50px] pb-[100px] max-[900px]:grid-cols-1 max-[900px]:gap-[45px] max-[900px]:pb-[70px]">
          <div className="max-w-[480px]">
            <h2 className={heading}>Контакты</h2>
            <p className="mt-[30px] text-[16px] leading-[1.65] text-[#36566c]">
              Производство в Санкт-Петербурге. Напишите или позвоните — обсудим
              деталь, уточним размеры и материал, посчитаем стоимость.
            </p>
            <p className="mt-9 text-[15px] font-semibold text-[#213b50]">
              Как оформить заказ
            </p>
            <ol className="mt-3 border-t border-[#cfe3ec]">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 border-b border-[#cfe3ec] py-4"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-[#b9d4e1] text-[12px] font-semibold text-[#326f91]"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[14px] leading-snug font-semibold text-[#213b50]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-[1.5] text-[#547183]">
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
        <div className="border-t border-[#c8dfe8] pt-[22px]">
          <nav
            aria-label="Юридическая информация"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium text-[#334f63] max-[700px]:text-[11px]"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#174d71] focus-visible:text-[#174d71]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-3 max-w-[760px] text-[11px] leading-[1.6] text-[#547183]">
            Информация на сайте носит справочный характер и не является
            публичной офертой (ст. 437 ГК РФ). Стоимость и сроки изготовления
            рассчитываются по запросу.
          </p>
          <div className="mt-5 flex flex-wrap justify-between gap-4 text-[10px] font-[650] tracking-[0.1em] text-[#334f63] max-[700px]:text-[9px]">
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
