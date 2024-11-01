import { cva } from "~/lib/cva";

export const CardStyles = {
  Root: cva({
    base: [
      "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
    ],
  }),
  Header: cva({
    base: ["flex flex-col space-y-1.5 p-6"],
  }),
  Title: cva({
    base: ["font-semibold text-2xl leading-none tracking-tight"],
  }),
  Description: cva({
    base: ["text-muted-foreground text-sm"],
  }),
  Content: cva({
    base: ["p-6 pt-0"],
  }),
  Footer: cva({
    base: ["flex items-center p-6 pt-0"],
  }),
};

export function CardRoot({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={CardStyles.Root({ className })} {...props} />
  );
}

export function CardHeader({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={CardStyles.Header({ className })} {...props} />
  );
}

export function CardTitle({
  ref,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3 ref={ref} className={CardStyles.Title({ className })} {...props} />
  );
}

export function CardDescription({
  ref,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p ref={ref} className={CardStyles.Description({ className })} {...props} />
  );
}

export function CardContent({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={CardStyles.Content({ className })} {...props} />
  );
}

export function CardFooter({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={CardStyles.Footer({ className })} {...props} />
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
