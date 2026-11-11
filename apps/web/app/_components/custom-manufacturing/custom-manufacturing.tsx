import { ArrowUpRight } from 'lucide-react';
import { HeroShader } from '../hero-shader/hero-shader';
import { action, heading, wrap } from '../landing-styles';
import { RequestSteps } from './components/request-steps';

export function CustomManufacturing() {
  return (
    <section
      id="custom"
      className="scroll-mt-6 bg-[linear-gradient(120deg,#eaf7fc_0%,#f8fdff_50%,#dceff8_100%)] py-[130px] text-[#213b50] shadow-[inset_0_1px_0_#fff,inset_0_-1px_0_rgb(191_222_236_/_50%)] max-[700px]:py-[85px]"
    >
      <div
        className={`${wrap} grid grid-cols-[1fr_0.8fr] gap-[100px] max-[900px]:gap-[50px] max-[700px]:grid-cols-1 max-[700px]:gap-[55px]`}
      >
        <div>
          <h2 className={heading}>
            Есть чертёж?
            <br />
            <span className="text-[#527f98]">Есть решение.</span>
          </h2>
          <p className="mt-[30px] mb-9 max-w-[450px] text-[16px] leading-[1.7] text-[#5c7888]">
            Расскажите о задаче и приложите чертёж, фотографию или техническое
            задание. Обсудим изготовление детали под ваши требования.
          </p>
          <a className={action} href="#request">
            Отправить чертёж <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="flex flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/70 shadow-[0_24px_60px_rgb(99_157_186_/_13%)]">
          <div
            className="relative grid min-h-[250px] place-items-center overflow-hidden bg-[linear-gradient(145deg,#f8fdff,#dceff8)] max-[700px]:min-h-[210px]"
            aria-hidden="true"
          >
            <HeroShader />
            <div className="relative z-1 grid size-[200px] place-items-center rounded-full border border-[#a0c5d5] max-[700px]:size-[170px]">
              <span className="size-[90px] rounded-full border border-[#a0c5d5]" />
            </div>
            <span className="absolute z-1 h-px w-4/5 bg-[#a0c5d5]" />
            <span className="absolute z-1 h-full w-px bg-[#a0c5d5]" />
          </div>
          <RequestSteps />
        </div>
      </div>
    </section>
  );
}
