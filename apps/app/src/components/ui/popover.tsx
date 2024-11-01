import {
  Anchor,
  Content,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-popover";
import { cx } from "~/lib/cva";

export const PopoverRoot = Root;

export const PopoverTrigger = Trigger;

export const PopoverAnchor = Anchor;

function PopoverContent({
  ref,
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cx(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      )}
      {...props}
    />
  );
}

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Portal,
  Content: PopoverContent,
});
