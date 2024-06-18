import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-alert-dialog";
import { ButtonStyles, type ButtonVariants } from "./button";
import { DialogStyles } from "./dialog";

export const AlertDialogRoot = Root;

export const AlertDialogTrigger = Trigger;

export const AlertDialogPortal = Portal;

export function AlertDialogOverlay({
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

export function AlertDialogContent({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <AlertDialogOverlay />
      <Content
        ref={ref}
        className={DialogStyles.Content({ className })}
        {...props}
      >
        {children}
      </Content>
    </Portal>
  );
}

export function AlertDialogHeader({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={DialogStyles.Header({ className })} {...props} />
  );
}

export function AlertDialogFooter({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={DialogStyles.Footer({ className })} {...props} />
  );
}

export function AlertDialogTitle({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Title>) {
  return (
    <Title ref={ref} className={DialogStyles.Title({ className })} {...props} />
  );
}

export function AlertDialogDescription({
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

export function AlertDialogAction({
  ref,
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Action> & ButtonVariants) {
  return (
    <Action
      ref={ref}
      className={ButtonStyles({ className, variant, size })}
      {...props}
    />
  );
}

export function AlertDialogCancel({
  ref,
  className,
  variant = "outline",
  size,
  ...props
}: React.ComponentProps<typeof Cancel> & ButtonVariants) {
  return (
    <Cancel
      ref={ref}
      className={ButtonStyles({
        className: ["mt-2 sm:mt-0", className],
        variant,
        size,
      })}
      {...props}
    />
  );
}

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Overlay: AlertDialogOverlay,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
