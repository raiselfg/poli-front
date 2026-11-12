import { FileUp } from 'lucide-react';
import { Highlight } from '../aceternity-ui/highlight';
import {
  AnimatedCopy,
  AnimatedDescription,
  AnimatedPhrase,
} from '../animated-phrase';
import { action, heading, phraseHighlight, wrap } from '../landing-styles';
import { RequestSteps } from './components/request-steps';

export function CustomManufacturing() {
  return (
    <section
      id="custom"
      className="scroll-mt-6 py-[130px] text-[#213b50] max-[700px]:py-[85px]"
    >
      <div
        className={`${wrap} grid grid-cols-[1fr_0.8fr] gap-[100px] max-[900px]:gap-[50px] max-[700px]:grid-cols-1 max-[700px]:gap-[55px]`}
      >
        <AnimatedCopy>
          <h2 className={heading}>
            Есть чертёж?
            <br />
            <Highlight className="from-[#92c6e9] to-[#c0b7e5] text-[#285f80]">
              Есть решение.
            </Highlight>
          </h2>
          <AnimatedDescription className="mt-[30px] mb-9 max-w-[450px] text-[16px] leading-[1.7] text-[#36566c]">
            Расскажите о задаче и приложите{' '}
            <AnimatedPhrase className={phraseHighlight} effect="underline">
              чертёж, фотографию или техническое задание.
            </AnimatedPhrase>{' '}
            Обсудим изготовление детали под ваши требования.
          </AnimatedDescription>
          <a
            className={`${action} group/drawing-action relative isolate overflow-hidden rounded-full before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-linear-to-r before:from-[#245b78] before:to-[#4389ad] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 focus-visible:before:opacity-100`}
            href="#request"
          >
            Отправить чертёж
            <FileUp
              size={18}
              aria-hidden="true"
              className="motion-safe:transition-[translate] motion-safe:duration-400 motion-safe:ease-in-out motion-safe:group-hover/drawing-action:-translate-y-1 motion-safe:group-focus-visible/drawing-action:-translate-y-1"
            />
          </a>
        </AnimatedCopy>
        <div className="self-center rounded-[28px] border border-white/90 bg-white/70 shadow-[0_24px_60px_rgb(99_157_186_/_13%)]">
          <RequestSteps />
        </div>
      </div>
    </section>
  );
}
