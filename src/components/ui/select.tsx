import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import { cn } from "~/lib/utils";
import { Icons } from "./icons";

export const SelectRoot = Root;

export const SelectGroup = Group;

export const SelectValue = Value;

export function SelectTrigger({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      ref={ref}
      className={cn(
        "group flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <Icon asChild>
        <Icons.ChevronDown className="size-4 opacity-50 transition-transform duration-200 aria-expanded:rotate-180" />
      </Icon>
    </Trigger>
  );
}

export function SelectScrollUpButton({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof ScrollUpButton>) {
  return (
    <ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <Icons.ChevronUp className="size-4" />
    </ScrollUpButton>
  );
}

export function SelectScrollDownButton({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof ScrollDownButton>) {
  return (
    <ScrollDownButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <Icons.ChevronDown className="size-4" />
    </ScrollDownButton>
  );
}

export function SelectContent({
  ref,
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        ref={ref}
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
          position === "popper" &&
            "data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  );
}

export function SelectLabel({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      ref={ref}
      className={cn("px-2 py-1.5 font-semibold text-sm", className)}
      {...props}
    />
  );
}

export function SelectItem({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Item>) {
  return (
    <Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Icons.Check className="size-4" />
        </ItemIndicator>
      </span>
      <ItemText>{children}</ItemText>
    </Item>
  );
}

export function SelectSeparator({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  );
}

export const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
});
