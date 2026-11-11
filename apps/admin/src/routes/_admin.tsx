import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { FetchError } from 'ofetch';
import { QueryState } from '@/components/query-state';
import { AdminLayout } from '@/components/admin-layout';
import { api, userSchema } from '@/lib/api';
export const Route = createFileRoute('/_admin')({
  beforeLoad: async () => {
    try {
      userSchema.parse(await api('/auth/me'));
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401)
        throw redirect({ to: '/auth/login' });
      throw error;
    }
  },
  component: AdminLayout,
  errorComponent: ({ error }) => <AuthError error={error} />,
});
function AuthError({ error }: { error: unknown }) {
  const router = useRouter();
  return (
    <main className="mx-auto max-w-lg p-6">
      <QueryState
        loading={false}
        error={error}
        retry={() => void router.invalidate()}
      />
    </main>
  );
}
