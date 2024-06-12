import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import { tv } from "tailwind-variants";

export const TabsStyles = {
  List: tv({
    base: "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
  }),
  Trigger: tv({
    base: [
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
    ],
  }),
  Content: tv({
    base: [
      "mt-2 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    ],
  }),
};

export const TabsRoot = Root;

export function TabsList({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof List>) {
  return (
    <List ref={ref} className={TabsStyles.List({ className })} {...props} />
  );
}

export function TabsTrigger({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      ref={ref}
      className={TabsStyles.Trigger({ className })}
      {...props}
    />
  );
}

export function TabsContent({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Content
      ref={ref}
      className={TabsStyles.Content({ className })}
      {...props}
    />
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
