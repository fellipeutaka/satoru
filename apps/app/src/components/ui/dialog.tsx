import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { cva } from "cva";
import { Icons } from "./icons";

export const DialogStyles = {
  Overlay: cva({
    base: [
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
      "data-[state=open]:fade-in-0 data-[state=open]:animate-in",
      "data-[state=closed]:fade-out-0 data-[state=closed]:animate-out",
    ],
  }),
  Content: cva({
    base: [
      "-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200",
      "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=open]:animate-in",
      "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:animate-out",
      "sm:rounded-lg",
    ],
  }),
  Close: cva({
    base: [
      "absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition",
      "hover:opacity-100",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:pointer-events-none",
      "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
    ],
  }),
  Header: cva({
    base: ["flex flex-col space-y-1.5 text-center", "sm:text-left"],
  }),
  Footer: cva({
    base: ["flex flex-col-reverse", "sm:flex-row sm:justify-end sm:space-x-2"],
  }),
  Title: cva({
    base: ["font-semibold text-lg leading-none tracking-tight"],
  }),
  Description: cva({
    base: ["text-muted-foreground text-sm"],
  }),
};

export const DialogRoot = Root;

DialogRoot.displayName = "Dialog";

export const DialogTrigger = Trigger;

DialogTrigger.displayName = "Dialog.Trigger";

export const DialogPortal = Portal;

export const DialogClose = Close;

DialogClose.displayName = "Dialog.Close";

export function DialogOverlay({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Overlay>) {
  return (
    <Overlay
      ref={ref}
      className={DialogStyles.Overlay({ className })}
      {...props}
    />
  );
}

export function DialogContent({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <DialogOverlay />
      <Content
        ref={ref}
        className={DialogStyles.Content({ className })}
        {...props}
      >
        {children}
        <Close aria-label="Close" className={DialogStyles.Close()}>
          <Icons.X className="size-4" aria-hidden />
        </Close>
      </Content>
    </Portal>
  );
}

export function DialogHeader({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={DialogStyles.Header({ className })} {...props} />
  );
}

export function DialogFooter({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={DialogStyles.Footer({ className })} {...props} />
  );
}

export function DialogTitle({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Title>) {
  return (
    <Title ref={ref} className={DialogStyles.Title({ className })} {...props} />
  );
}

export function DialogDescription({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Description>) {
  return (
    <Description
      ref={ref}
      className={DialogStyles.Description({ className })}
      {...props}
    />
  );
}

export function handleCloseDialog() {
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "Escape",
    })
  );
}

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Header: DialogHeader,
  Footer: DialogFooter,
  Close,
});
