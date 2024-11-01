import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from "@radix-ui/react-context-menu";
import { cx } from "~/lib/cva";
import { Icons } from "./icons";

const ContextMenuRoot = Root;

const ContextMenuTrigger = Trigger;

const ContextMenuGroup = Group;

const ContextMenuPortal = Portal;

const ContextMenuSub = Sub;

const ContextMenuRadioGroup = RadioGroup;

interface ContextMenuSubTriggerProps
  extends React.ComponentProps<typeof SubTrigger> {
  inset?: boolean;
}

export function ContextMenuSubTrigger({
  ref,
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <SubTrigger
      ref={ref}
      className={cx(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <Icons.ChevronRight className="ml-auto size-4" />
    </SubTrigger>
  );
}

export function ContextMenuSubContent({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof SubContent>) {
  return (
    <SubContent
      ref={ref}
      className={cx(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      )}
      {...props}
    />
  );
}

export function ContextMenuContent({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        ref={ref}
        className={cx(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
          className
        )}
        {...props}
      />
    </Portal>
  );
}

interface ContextMenuItemProps extends React.ComponentProps<typeof Item> {
  inset?: boolean;
}

export function ContextMenuItem({
  ref,
  className,
  inset,
  ...props
}: ContextMenuItemProps) {
  return (
    <Item
      ref={ref}
      className={cx(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

export function ContextMenuCheckboxItem({
  ref,
  className,
  checked,
  children,
  ...props
}: React.ComponentProps<typeof CheckboxItem>) {
  return (
    <CheckboxItem
      ref={ref}
      className={cx(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Icons.Check className="size-4" />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  );
}

export function ContextMenuRadioItem({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioItem>) {
  return (
    <RadioItem
      ref={ref}
      className={cx(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Icons.DotFilled className="size-4 fill-current" />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  );
}

interface ContextMenuLabelProps extends React.ComponentProps<typeof Label> {
  inset?: boolean;
}

export function ContextMenuLabel({
  ref,
  className,
  inset,
  ...props
}: ContextMenuLabelProps) {
  return (
    <Label
      ref={ref}
      className={cx(
        "px-2 py-1.5 font-semibold text-foreground text-sm",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

export function ContextMenuSeparator({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      ref={ref}
      className={cx("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export function ContextMenuShortcut({
  ref,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      ref={ref}
      className={cx(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioItem: ContextMenuRadioItem,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Group: ContextMenuGroup,
  Portal: ContextMenuPortal,
  Sub: ContextMenuSub,
  SubContent: ContextMenuSubContent,
  SubTrigger: ContextMenuSubTrigger,
  RadioGroup: ContextMenuRadioGroup,
});
