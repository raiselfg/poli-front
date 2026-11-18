import { heading, wrap } from '../landing-styles';
import { RequestForm } from './components/request-form';

const steps = [
  {
    title: (
      <>
        Оставьте заявку,{' '}
        <a
          href="#contacts"
          className="landing-link decoration-landing-accent-light underline underline-offset-4 hover:decoration-current"
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
      aria-labelledby="request-title"
      className="bg-dark-panel text-on-dark py-section"
    >
      <div
        className={`${wrap} landing:grid-cols-[minmax(0,1fr)_minmax(0,var(--spacing-order-form))] landing:gap-12 grid items-start gap-8`}
      >
        <div>
          <p className="text-ink-on-dark-muted mb-5 font-mono text-xs font-bold tracking-widest">
            Расчёт по вашей детали
          </p>
          <h2 id="request-title" className={heading}>
            Как оформить заказ
          </h2>
          <ol role="list" className="mt-8">
            {steps.map((step, index) => (
              <li
                key={step.text}
                className="border-line-dark flex gap-4 border-t py-5"
              >
                <span
                  aria-hidden="true"
                  className="text-landing-accent-light shrink-0 font-mono text-lg font-bold"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg leading-snug font-bold">
                    {step.title}
                  </h3>
                  <p className="text-ink-on-dark-muted mt-2 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <RequestForm />
      </div>
    </section>
  );
}
