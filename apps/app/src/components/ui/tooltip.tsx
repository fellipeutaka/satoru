import {
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import { cx } from "~/lib/cva";

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
      className={cx(
        "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out",
        className
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
  }
);
