import { SidebarTrigger, useSidebar } from '@workspace/ui/components/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';

export function DashboardSidebarTrigger() {
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
