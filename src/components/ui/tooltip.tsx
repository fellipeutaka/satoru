import {
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import { cn } from "~/lib/utils";

const TooltipProvider = Provider;

const TooltipRoot = Root;

const TooltipTrigger = Trigger;

export function TooltipContent({
  ref,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Content
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export const Tooltip = Object.assign(
  {},
  {
    Provider: TooltipProvider,
    Root: TooltipRoot,
    Trigger: TooltipTrigger,
    Content: TooltipContent,
    Portal,
  },
);
