import { Indicator, Root } from "@radix-ui/react-checkbox";
import { tv } from "tailwind-variants";
import { type IconProps, Icons } from "./icons";

export const CheckboxStyles = {
  Root: tv({
    base: [
      "peer size-4 shrink-0 rounded-sm border border-primary shadow",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    ],
  }),
  Indicator: tv({
    base: "flex items-center justify-center text-current",
  }),
  Icon: tv({
    base: "size-4",
  }),
};

export function CheckboxRoot({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Root>) {
  return (
    <Root ref={ref} className={CheckboxStyles.Root({ className })} {...props} />
  );
}

export function CheckboxIndicator({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Indicator>) {
  return (
    <Indicator
      ref={ref}
      className={CheckboxStyles.Indicator({ className })}
      {...props}
    />
  );
}

export function CheckboxIcon({ ref, className, ...props }: IconProps) {
  return (
    <Icons.Check
      ref={ref}
      className={CheckboxStyles.Icon({ className })}
      {...props}
    />
  );
}

export const Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator,
  Icon: CheckboxIcon,
});
