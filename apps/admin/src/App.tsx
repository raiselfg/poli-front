import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from '@workspace/ui/components/sonner';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { useTheme } from '@/components/theme-provider';
import { errorMessage, notifyError } from '@/lib/errors';
import { categoriesQuery } from './features/categories/data';
import { contactsQuery } from './features/contacts/data';
import { requestsQuery } from './features/requests/data';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const title = query.meta?.errorTitle;
      notifyError(
        typeof title === 'string' ? title : 'Не удалось загрузить данные',
        errorMessage(error)
      );
    },
  }),
  defaultOptions: { queries: { retry: false } },
});

for (const queryKey of [
  categoriesQuery.queryKey,
  contactsQuery.queryKey,
  requestsQuery.queryKey,
]) {
  // Пока сервер сохраняет изменения, фоновые чтения не должны затирать их.
  const canRefetch = () =>
    queryClient.isMutating({ mutationKey: queryKey }) === 0;
  queryClient.setQueryDefaults(queryKey, {
    refetchOnMount: canRefetch,
    refetchOnWindowFocus: canRefetch,
    refetchOnReconnect: canRefetch,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster theme={theme} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
