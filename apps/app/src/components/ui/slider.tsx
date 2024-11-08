import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { cx } from "~/lib/cva";

export function SliderRoot({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Root>) {
  return (
    <Root
      ref={ref}
      className={cx(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    />
  );
}

export function SliderTrack({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Track>) {
  return (
    <Track
      ref={ref}
      className={cx(
        "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    />
  );
}

export function SliderRange({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Range>) {
  return (
    <Range
      ref={ref}
      className={cx("absolute h-full bg-primary", className)}
      {...props}
    />
  );
}

export function SliderThumb({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Thumb>) {
  return (
    <Thumb
      ref={ref}
      className={cx(
        "block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export const Slider = Object.assign(SliderRoot, {
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
});
