import type { Contacts } from '../../../_lib/contacts/contacts-schema';

export function ContactMap({
  latitude: latitudeValue,
  longitude: longitudeValue,
}: Pick<Contacts, 'latitude' | 'longitude'>) {
  const rawLatitude = latitudeValue?.toString().trim() ?? '';
  const rawLongitude = longitudeValue?.toString().trim() ?? '';
  if (rawLatitude === '' || rawLongitude === '') return null;

  const latitude = Number(rawLatitude);
  const longitude = Number(rawLongitude);
  if (!(Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180)) return null;

  const point = [longitude, latitude].join(',');
  const mapParams = new URLSearchParams({
    ll: point,
    pt: `${point},pm2rdm`,
    z: '16',
  });

  return (
    <div className="min-h-map relative w-full max-w-[730px] min-w-0 min-[900px]:min-h-90 min-[900px]:flex-1">
      <iframe
        title="Расположение производства на Яндекс Картах"
        src={`https://yandex.ru/map-widget/v1/?${mapParams.toString()}`}
        loading="lazy"
        allowFullScreen
        className="border-line bg-surface absolute inset-0 size-full rounded-[24px] border"
      />
    </div>
  );
}
