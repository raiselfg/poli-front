import { getContacts } from "../../../_lib/contacts/contacts";

export async function ContactMap() {
  const contacts = await getContacts().catch(() => null);
  if (contacts === null) return null;

  const rawLatitude = contacts.latitude?.toString().trim() ?? "";
  const rawLongitude = contacts.longitude?.toString().trim() ?? "";
  if (rawLatitude === "" || rawLongitude === "") return null;

  const latitude = Number(rawLatitude);
  const longitude = Number(rawLongitude);
  if (!(Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180)) return null;

  const point = [longitude, latitude].join(",");
  const mapParams = new URLSearchParams({
    ll: point,
    pt: `${point},pm2rdm`,
    z: "16",
  });

  return (
    <div className="relative min-h-[300px] w-full max-w-[730px] flex-1 min-[900px]:min-h-[360px]">
      <iframe
        title="Расположение производства на Яндекс Картах"
        src={`https://yandex.ru/map-widget/v1/?${mapParams.toString()}`}
        loading="lazy"
        allowFullScreen
        className="absolute inset-0 size-full rounded-[24px] border border-zinc-300 bg-zinc-100"
      />
    </div>
  );
}
