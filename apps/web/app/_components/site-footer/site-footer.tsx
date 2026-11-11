import { Suspense } from 'react';
import { connection } from 'next/server';
import { ArrowUpRight } from 'lucide-react';
import { getContacts } from '../../_lib/contacts/contacts';
import { heading, wrap } from '../landing-styles';
import { ContactsSkeleton } from './components/contacts-skeleton';

export function SiteFooter() {
  return (
    <footer
      id="contacts"
      className="scroll-mt-6 bg-[linear-gradient(135deg,#eef9fd,#e0f1f9_55%,#f5fcff)] pt-[85px] pb-[25px] shadow-[inset_0_1px_0_#fff]"
    >
      <div className={wrap}>
        <div className="grid grid-cols-[1fr_330px] gap-[50px] pb-[100px] max-[700px]:grid-cols-1 max-[700px]:gap-[45px] max-[700px]:pb-[70px]">
          <div>
            <h2 className={heading}>
              На связи
              <br />
              <span className="text-[#578ba6]">по делу.</span>
            </h2>
          </div>
          <div className="border-t border-[#c8dfe8] pt-[17px]">
            <Suspense fallback={<ContactsSkeleton />}>
              <ContactDetails />
            </Suspense>
            <a
              href="#request"
              className="inline-flex items-center gap-5 border-b border-current pb-[10px] text-[13px] font-[650]"
            >
              Перейти к заявке <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="flex justify-between gap-4 border-t border-[#c8dfe8] pt-[22px] text-[10px] font-[650] tracking-[0.1em] text-[#587485] max-[700px]:text-[9px]">
          <span className="max-[700px]:max-w-[220px]">
            ПРОИЗВОДСТВО ПОЛИУРЕТАНОВЫХ ИЗДЕЛИЙ
          </span>
        </div>
      </div>
    </footer>
  );
}

async function ContactDetails() {
  await connection();
  const result = await getContacts().then(
    (contacts) => ({ contacts, error: false as const }),
    (error: unknown) => {
      console.error('Не удалось загрузить контакты', error);
      return { error: true as const };
    }
  );
  if (result.error)
    return (
      <p className="my-7 text-[#607d8d]">
        Не удалось загрузить контакты. Попробуйте обновить страницу.
      </p>
    );
  const contacts = result.contacts;
  if (contacts === null)
    return <p className="my-7 text-[#607d8d]">Контакты пока не добавлены.</p>;
  const phoneHref = contacts.phone.replace(/[^+0-9]/g, '');
  return (
    <address className="my-7 flex flex-col items-start gap-3 text-[15px] leading-[1.6] text-[#607d8d] not-italic">
      {contacts.phone !== '' &&
        (phoneHref !== '' ? (
          <a href={`tel:${phoneHref}`}>{contacts.phone}</a>
        ) : (
          <span>{contacts.phone}</span>
        ))}
      {contacts.email !== null && contacts.email !== '' && (
        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
      )}
      {contacts.address !== '' && <span>{contacts.address}</span>}
      {contacts.working_hours !== null && contacts.working_hours !== '' && (
        <span>{contacts.working_hours}</span>
      )}
      {contacts.telegram_url !== null && contacts.telegram_url !== '' && (
        <a
          href={contacts.telegram_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </a>
      )}
      {contacts.whatsapp_url !== null && contacts.whatsapp_url !== '' && (
        <a
          href={contacts.whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      )}
    </address>
  );
}
