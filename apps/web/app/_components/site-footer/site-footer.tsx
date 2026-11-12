import { Suspense } from 'react';
import { heading, wrap } from '../landing-styles';
import { ContactDetails } from './components/contact-details';
import { ContactReveal } from './components/contact-reveal';
import { ContactsSkeleton } from './components/contacts-skeleton';

export function SiteFooter() {
  return (
    <footer id="contacts" className="scroll-mt-6 pt-[85px] pb-[25px]">
      <div className={wrap}>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-[50px] pb-[100px] max-[700px]:grid-cols-1 max-[700px]:gap-[45px] max-[700px]:pb-[70px]">
          <div>
            <h2 className={heading}>
              На связи
              <br />
              <span className="text-[#235778]">по делу.</span>
            </h2>
          </div>
          <ContactReveal>
            <Suspense fallback={<ContactsSkeleton />}>
              <ContactDetails />
            </Suspense>
          </ContactReveal>
        </div>
        <div className="flex justify-between gap-4 border-t border-[#c8dfe8] pt-[22px] text-[10px] font-[650] tracking-[0.1em] text-[#334f63] max-[700px]:text-[9px]">
          <span className="max-[700px]:max-w-[220px]">
            ПРОИЗВОДСТВО ПОЛИУРЕТАНОВЫХ ИЗДЕЛИЙ
          </span>
        </div>
      </div>
    </footer>
  );
}
