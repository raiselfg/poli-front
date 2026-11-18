import { CircleHelp } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';

export function CategoryHelp({ label, text }: { label: string; text: string }) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 [@media(hover:none)]:hidden"
              aria-label={label}
            />
          }
        >
          <CircleHelp aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent side="bottom">{text}</TooltipContent>
      </Tooltip>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hidden size-8 [@media(hover:none)]:inline-flex"
              aria-label={label}
            />
          }
        >
          <CircleHelp aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent>{text}</PopoverContent>
      </Popover>
    </>
  );
}
