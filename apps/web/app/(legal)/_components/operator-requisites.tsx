import { operator } from '@/lib/legal';

export function OperatorRequisites() {
  const rows = [
    { label: 'Наименование', value: operator.name },
    { label: 'ИНН', value: operator.inn },
    { label: 'ОГРН / ОГРНИП', value: operator.ogrn },
    { label: 'Адрес', value: operator.address },
    { label: 'Город', value: operator.city },
    { label: 'Электронная почта', value: operator.email, isEmail: true },
  ].filter((row) => row.value !== '');

  return (
    <dl className="rounded-panel border-line divide-line bg-bg divide-y border px-4">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 py-3 text-sm sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
        >
          <dt className="text-ink font-bold">{row.label}</dt>
          <dd className="min-w-0 wrap-anywhere">
            {row.isEmail === true ? (
              <a href={`mailto:${row.value}`}>{row.value}</a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
