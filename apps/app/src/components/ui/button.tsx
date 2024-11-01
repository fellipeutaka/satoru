import { type VariantProps, cva } from "~/lib/cva";

export const ButtonStyles = cva({
  base: "inline-flex select-none items-center justify-center whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline:
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ButtonVariants = VariantProps<typeof ButtonStyles>;

export interface ButtonProps
  extends React.ComponentPropsWithRef<"button">,
    ButtonVariants {}

export function Button({
  ref,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={ButtonStyles({ variant, size, className })}
      ref={ref}
      {...props}
    />
  );
}
