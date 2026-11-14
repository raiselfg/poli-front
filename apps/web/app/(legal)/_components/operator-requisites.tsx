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
    <dl className="border-t border-zinc-300">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[200px_minmax(0,1fr)] gap-4 border-b border-zinc-300 py-2.5 max-[700px]:grid-cols-1 max-[700px]:gap-0.5"
        >
          <dt className="text-[length:calc(13px*var(--text-scale))] font-semibold text-zinc-900">
            {row.label}
          </dt>
          <dd className="text-[length:calc(14px*var(--text-scale))]">
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
