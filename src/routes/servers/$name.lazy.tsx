import { createLazyFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/layout/header";
import { Separator } from "~/components/ui/separator";

export const Route = createLazyFileRoute("/servers/$name")({
  component: Component,
});

function Component() {
  return (
    <main className="shell">
      <Header
        title="Servers"
        description="This is the servers page. You can add servers here for your application."
      />
      <Separator />
      <div>Hello /(servers)/$name!</div>
    </main>
  );
}
