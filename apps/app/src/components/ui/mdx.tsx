import { cx } from "~/lib/cva";

export const Mdx = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1
      {...props}
      className={cx("mt-2 font-bold text-4xl tracking-tight", props.className)}
    />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      {...props}
      className={cx(
        "mt-10 border-b pb-1 font-semibold text-3xl tracking-tight first:mt-0",
        props.className
      )}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      {...props}
      className={cx(
        "mt-8 font-semibold text-2xl tracking-tight",
        props.className
      )}
    />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className={cx(
        "font-medium underline underline-offset-4",
        props.className
      )}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      {...props}
      className={cx("leading-7 [&:not(:first-child)]:mt-6", props.className)}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} className={cx("my-6 ml-6 list-disc", props.className)} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol {...props} className={cx("my-6 ml-6 list-decimal", props.className)} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li {...props} className={cx("mt-2", props.className)} />
  ),
};
