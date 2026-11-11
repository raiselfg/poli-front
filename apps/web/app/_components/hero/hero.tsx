import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { action, textLink, wrap } from '../landing-styles';

export function Hero() {
  return (
    <section
      className={`${wrap} scroll-mt-6 pt-[22px]`}
      aria-labelledby="hero-title"
    >
      <div className="pt-[45px] pb-[30px] max-[700px]:pt-[15px] max-[700px]:pb-5">
        <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center py-20 text-center max-[700px]:pt-[35px] max-[700px]:pb-5">
          <h1
            id="hero-title"
            className="my-[30px] text-[clamp(38px,4.8vw,72px)] leading-[0.98] font-medium tracking-[-0.045em] max-[700px]:my-[25px] max-[700px]:text-[clamp(38px,10vw,68px)]"
          >
            Изделия из
            <br />
            <span className="text-[#578ba6]">полиуретана.</span>
          </h1>
          <p className="max-w-[440px] text-[17px] leading-[1.6] text-[#5c7788] max-[700px]:text-[15px]">
            Изготавливаем изделия из полиуретана, в том числе по вашим чертежам
            и техническим требованиям.
          </p>
          <div className="mt-[38px] flex flex-wrap items-center justify-center gap-7 max-[700px]:mt-7 max-[700px]:gap-[18px]">
            <a className={action} href="#request">
              Отправить заявку <ArrowUpRight size={18} />
            </a>
            <a className={textLink} href="#catalog">
              Смотреть продукцию <ArrowDown size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
