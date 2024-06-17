import { cn } from "~/lib/utils";

export type LabelProps = React.ComponentPropsWithRef<"label">;

export function Label({ ref, className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "select-none font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
