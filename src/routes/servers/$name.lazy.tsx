import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/layout/header";
import { Eula } from "~/components/servers/eula";
import { ButtonStyles } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
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
      <div>
        <Link to="/servers" className={ButtonStyles({ variant: "outline" })}>
          <Icons.ChevronLeft className="size-4 mr-2" />
          Back to Servers
        </Link>
      </div>
      <div className="container max-w-4xl">
        <Eula />
      </div>
    </main>
  );
}
