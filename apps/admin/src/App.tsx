import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from '@workspace/ui/components/sonner';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { useTheme } from '@/components/theme-provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

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
