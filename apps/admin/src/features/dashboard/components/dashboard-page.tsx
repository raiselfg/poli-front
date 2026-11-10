import { Link } from '@tanstack/react-router';
import { Separator } from '@workspace/ui/components/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@workspace/ui/components/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { LayoutDashboard } from 'lucide-react';

function DashboardSidebarTrigger() {
  const { isMobile, open, openMobile } = useSidebar();
  const label = (isMobile ? openMobile : open)
    ? 'Скрыть боковую панель'
    : 'Открыть боковую панель';

  return (
    <Tooltip>
      <TooltipTrigger render={<SidebarTrigger aria-label={label} />} />
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

export function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
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
