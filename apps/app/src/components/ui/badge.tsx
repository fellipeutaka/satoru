import { type VariantProps, tv } from "tailwind-variants";

export const BadgeStyles = tv({
  base: [
    "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 font-semibold text-xs outline-none transition-colors",
    "focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ],
  variants: {
    variant: {
      default: ["bg-primary text-primary-foreground", "hover:bg-primary/80"],
      secondary: [
        "bg-secondary text-secondary-foreground",
        "hover:bg-secondary/80",
      ],
      destructive: [
        "bg-destructive text-destructive-foreground",
        "hover:bg-destructive/80",
      ],
      outline: ["border-border text-foreground"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeProps = React.ComponentProps<"div"> &
  VariantProps<typeof BadgeStyles>;

export function Badge({ ref, className, variant, ...props }: BadgeProps) {
  return (
    <div ref={ref} className={BadgeStyles({ className, variant })} {...props} />
  );
}
