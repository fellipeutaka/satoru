import { Root, Thumb } from "@radix-ui/react-switch";
import { cx } from "~/lib/cva";

export function SwitchRoot({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Root>) {
  return (
    <Root
      ref={ref}
      className={cx(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    />
  );
}

export function SwitchThumb({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Thumb>) {
  return (
    <Thumb
      ref={ref}
      className={cx(
        "pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        className
      )}
      {...props}
    />
  );
}

export const Switch = Object.assign(SwitchRoot, { Thumb: SwitchThumb });
