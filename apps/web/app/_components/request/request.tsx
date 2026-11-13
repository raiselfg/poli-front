import {
  AnimatedCopy,
  AnimatedDescription,
  AnimatedPhrase,
} from '../animated-phrase';
import { heading, lineReveal, phraseHighlight, wrap } from '../landing-styles';
import { TextAnimate } from '../magic-ui/text-animate';
import { RequestForm } from './components/request-form';

export function Request() {
  return (
    <section
      id="request"
      className={`${wrap} grid scroll-mt-6 grid-cols-[0.9fr_1.1fr] gap-[12%] py-[150px] max-[900px]:gap-[7%] max-[700px]:grid-cols-1 max-[700px]:gap-[50px] max-[700px]:py-[95px]`}
    >
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
            className="text-[#285f80] motion-reduce:opacity-100!"
            segmentClassName="motion-reduce:[clip-path:none]!"
          >
            по вашей детали
          </TextAnimate>
        </h2>
        <AnimatedDescription
          effect="soften"
          className="mt-[30px] mb-[18px] max-w-[380px] text-[16px] leading-[1.65] text-[#36566c]"
        >
          Чертёж, фото или ТЗ — достаточно, чтобы начать.{' '}
          <AnimatedPhrase className={phraseHighlight} effect="color">
            Посчитаем стоимость
          </AnimatedPhrase>{' '}
          и уточним детали по телефону.
        </AnimatedDescription>
      </AnimatedCopy>
      <RequestForm />
    </section>
  );
}
