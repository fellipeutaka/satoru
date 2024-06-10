import { createFileRoute } from "@tanstack/react-router";
import { ServerList } from "~/components/servers/server-list";
import { Separator } from "~/components/ui/separator";

export const Route = createFileRoute("/")({
  component: Component,
});

function Component() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-lg font-medium">Servers</h1>
        <h2 className="text-sm text-muted-foreground">
          This is the servers page. You can add servers here for your
          application.
        </h2>
      </header>
      <Separator />
      <ServerList />
    </main>
  );
}
