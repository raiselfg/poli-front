import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { getContacts } from '../../../_lib/contacts/contacts';

export async function ContactDetails() {
  const result = await getContacts().then(
    (contacts) => ({ contacts, error: false as const }),
    (error: unknown) => {
      console.error('Не удалось загрузить контакты', error);
      return { error: true as const };
    }
  );
  if (result.error)
    return (
      <p className="my-7 text-[#334f63]">
        Не удалось загрузить контакты. Попробуйте обновить страницу.
      </p>
    );
  const contacts = result.contacts;
  if (contacts === null)
    return <p className="my-7 text-[#334f63]">Контакты пока не добавлены.</p>;
  const phoneNumber = contacts.phone.replace(/\D/g, '');
  const phoneHref =
    phoneNumber !== ''
      ? `tel:${contacts.phone.trimStart().startsWith('+') ? '+' : ''}${phoneNumber}`
      : undefined;
  return (
    <address className="mb-7 grid divide-y divide-[#235778]/20 text-[#173b58] not-italic">
      {contacts.phone !== '' && (
        <ContactRow
          icon={Phone}
          label="Телефон"
          value={contacts.phone}
          href={phoneHref}
        />
      )}
      {contacts.email !== null && contacts.email !== '' && (
        <ContactRow
          icon={Mail}
          label="Почта"
          value={contacts.email}
          href={`mailto:${contacts.email}`}
        />
      )}
      {contacts.address !== '' && (
        <ContactRow icon={MapPin} label="Адрес" value={contacts.address} />
      )}
      {contacts.working_hours !== null && contacts.working_hours !== '' && (
        <ContactRow
          icon={Clock}
          label="Часы работы"
          value={contacts.working_hours}
        />
      )}
      {contacts.telegram_url !== null && contacts.telegram_url !== '' && (
        <ContactRow
          icon={MessageCircle}
          label="Мессенджер"
          value="Telegram"
          href={contacts.telegram_url}
        />
      )}
      {contacts.whatsapp_url !== null && contacts.whatsapp_url !== '' && (
        <ContactRow
          icon={MessageCircle}
          label="Мессенджер"
          value="WhatsApp"
          href={contacts.whatsapp_url}
        />
      )}
    </address>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const row = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/50 text-[#235778] transition-colors duration-300 group-hover:bg-white/80 group-focus-visible:bg-white/80">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-[#425f76]">
          {label}
        </span>
        <span className="block text-base leading-snug font-bold wrap-anywhere decoration-[#235778]/35 underline-offset-4 group-hover:underline group-focus-visible:underline">
          {value}
        </span>
      </span>
      {href !== undefined && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="ml-auto shrink-0 motion-safe:transition-[translate] motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5"
        />
      )}
    </>
  );
  const className = 'flex items-center gap-4 py-3';
  if (href === undefined) return <div className={className}>{row}</div>;

  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${className} group rounded-lg`}
    >
      {row}
    </a>
  );
}
