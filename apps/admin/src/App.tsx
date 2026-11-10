import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from '@workspace/ui/components/sonner';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { useTheme } from '@/components/theme-provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const { theme } = useTheme();

  return (
    <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster theme={theme} />
    </TooltipProvider>
  );
}
