import { AnimatedCopy } from '../animated-phrase';
import { heading, lineReveal, wrap } from '../landing-styles';
import { TextAnimate } from '../magic-ui/text-animate';
import { RequestForm } from './components/request-form';

const steps = [
  {
    title: (
      <>
        Оставьте заявку,{' '}
        <a
          href="#contacts"
          className="underline underline-offset-4 hover:text-zinc-700"
        >
          напишите или позвоните
        </a>
      </>
    ),
    text: 'Заполните форму и при желании прикрепите фото, чертёж или ТЗ. Материалы и описание детали также можно отправить на электронную почту или в мессенджер.',
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

export function Request() {
  return (
    <section
      id="request"
      className={`${wrap} grid scroll-mt-6 grid-cols-[0.9fr_1.1fr] gap-[12%] py-[150px] max-[900px]:gap-[7%] max-[700px]:grid-cols-1 max-[700px]:gap-8 max-[700px]:py-8`}
    >
      <div>
        <AnimatedCopy>
          <h2 className={heading}>
            Расчёт
            <br />
            <TextAnimate
              as="span"
              by="text"
              startOnView={false}
              animate={undefined}
              variants={lineReveal}
              className="text-zinc-800 motion-reduce:opacity-100!"
              segmentClassName="motion-reduce:[clip-path:none]!"
            >
              по вашей детали
            </TextAnimate>
          </h2>
        </AnimatedCopy>
        <h3 className="mt-9 text-[length:calc(15px*var(--text-scale))] font-semibold text-zinc-900">
          Как оформить заказ
        </h3>
        <ol className="mt-3 border-t border-zinc-300">
          {steps.map((step, index) => (
            <li
              key={step.text}
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
      <RequestForm />
    </section>
  );
}
