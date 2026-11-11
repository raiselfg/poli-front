import { ArrowDownRight } from 'lucide-react';
import { heading, wrap } from '../landing-styles';
import { RequestForm } from './components/request-form';

export function Request() {
  return (
    <section
      id="request"
      className={`${wrap} grid scroll-mt-6 grid-cols-[0.9fr_1.1fr] gap-[12%] py-[150px] max-[900px]:gap-[7%] max-[700px]:grid-cols-1 max-[700px]:gap-[50px] max-[700px]:py-[95px]`}
    >
      <div>
        <h2 className={heading}>
          Обсудим
          <br />
          <span className="text-[#578ba6]">ваш проект.</span>
        </h2>
        <p className="mt-[30px] mb-[18px] max-w-[380px] text-[15px] leading-[1.7] text-[#607d8d]">
          Расскажите, какое изделие вам нужно. Можно приложить чертёж,
          фотографию или техническое задание.
        </p>
        <ArrowDownRight
          className="mt-[50px] text-[#76afc9] max-[700px]:hidden"
          size={62}
          strokeWidth={1}
        />
      </div>
      <RequestForm />
    </section>
  );
}
