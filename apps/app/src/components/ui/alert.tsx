import { type VariantProps, cva } from "~/lib/cva";

export const AlertStyles = {
  Root: cva({
    base: [
      "relative w-full rounded-lg border px-4 py-3 text-sm",
      "[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
    ],

    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }),
  Title: cva({
    base: ["mb-1 font-medium leading-none tracking-tight"],
  }),
  Description: cva({
    base: ["text-sm [&_p]:leading-relaxed"],
  }),
};

interface AlertRootProps
  extends React.ComponentProps<"div">,
    VariantProps<(typeof AlertStyles)["Root"]> {}

export function AlertRoot({
  ref,
  className,
  variant,
  ...props
}: AlertRootProps) {
  return (
    <div
      ref={ref}
      role="alert"
      className={AlertStyles.Root({ variant, className })}
      {...props}
    />
  );
}

export function AlertTitle({
  ref,
  className,
  ...props
}: React.ComponentProps<"h5">) {
  return (
    <h5 ref={ref} className={AlertStyles.Title({ className })} {...props} />
  );
}

export function AlertDescription({
  ref,
  className,
  ...props
}: React.ComponentProps<"h6">) {
  return (
    <h6
      ref={ref}
      className={AlertStyles.Description({ className })}
      {...props}
    />
  );
}

export const Alert = Object.assign(AlertRoot, {
  Title: AlertTitle,
  Description: AlertDescription,
});
