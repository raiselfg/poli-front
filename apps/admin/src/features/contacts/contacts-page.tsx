import { useQuery } from '@tanstack/react-query';
import { contactsQuery } from './data';
import { QueryState } from '@/components/query-state';
import { ContactForm } from './contact-form';

export function Contacts() {
  const query = useQuery(contactsQuery);
  return (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Контакты</h1>
        <p className="text-sm text-muted-foreground">
          Редактируйте контактные данные, которые отображаются в разделе
          «Контакты» на сайте.
        </p>
      </div>
      <QueryState
        loading={query.isLoading}
        error={query.error}
        retry={() => void query.refetch()}
      />
      {query.data && (
        <ContactForm key={query.data.updated_at} data={query.data} />
      )}
    </div>
  );
}
