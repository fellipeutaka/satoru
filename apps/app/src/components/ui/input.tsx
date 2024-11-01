import { cva } from "~/lib/cva";

export const InputStyles = cva({
  base: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
});

export function Input({
  ref,
  type = "text",
  className,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  return (
    <input
      ref={ref}
      type={type}
      className={InputStyles({ className })}
      autoComplete="one-time-code"
      autoCorrect="off"
      autoSave="off"
      {...props}
    />
  );
}
