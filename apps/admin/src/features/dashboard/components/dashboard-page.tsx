import { Link } from '@tanstack/react-router';
import { Separator } from '@workspace/ui/components/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@workspace/ui/components/sidebar';
import { Switch } from '@workspace/ui/components/switch';
import { LayoutDashboard, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { DashboardSidebarTrigger } from '@/components/dashboard-sidebar-trigger';

export function DashboardPage() {
  const { resolvedTheme, setTheme } = useTheme();

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
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive render={<Link to="/" />}>
                    <LayoutDashboard aria-hidden="true" />
                    <span>Главная</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4 md:px-6">
          <DashboardSidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">Главная</span>
        </header>
        <main className="flex flex-1 flex-col p-6 md:p-10">
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="text-2xl font-semibold tracking-tight">Главная</h1>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
