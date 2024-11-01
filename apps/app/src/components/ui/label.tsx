import { cx } from "cva";

export type LabelProps = React.ComponentPropsWithRef<"label">;

export function Label({ ref, className, htmlFor, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      aria-label={props["aria-label"]}
      className={cx(
        "select-none font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      ref={ref}
      {...props}
    />
  );
}
