import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { Separator } from '@workspace/ui/components/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from '@workspace/ui/components/sidebar';
import { Switch } from '@workspace/ui/components/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { DashboardSidebarTrigger } from '@/components/dashboard-sidebar-trigger';
import { links } from './admin-navigation';

export function AdminLayout() {
  const { resolvedTheme, setTheme } = useTheme();
  const path = useLocation({ select: (location) => location.pathname });
  const title =
    links.find((item) => item.to !== '/' && path.startsWith(item.to))?.label ??
    'Главная';
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="flex-row items-center gap-3 px-4 py-4">
          <Sun className="size-4 text-muted-foreground" aria-hidden="true" />
          <Switch
            aria-label="Тёмная тема"
            checked={resolvedTheme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
          <Moon className="size-4 text-muted-foreground" aria-hidden="true" />
        </SidebarHeader>
        <Navigation path={path} />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4 md:px-6">
          <DashboardSidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">{title}</span>
        </header>
        <main className="flex min-w-0 flex-1 flex-col p-4 sm:p-6 md:p-10">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Navigation({ path }: { path: string }) {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarContent className="px-2">
      <SidebarMenu>
        {links.map(({ to, label, icon: Icon }) => (
          <SidebarMenuItem key={to}>
            <SidebarMenuButton
              isActive={to === '/' ? path === '/' : path.startsWith(to)}
              render={<Link to={to} onClick={() => setOpenMobile(false)} />}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
