import { useQuery } from "@tanstack/react-query";
import { Link, createLazyFileRoute, useParams } from "@tanstack/react-router";
import { Header } from "~/components/layout/header";
import { Eula } from "~/components/servers/eula";
import { EulaForm } from "~/components/servers/eula-form";
import { ButtonStyles } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { Separator } from "~/components/ui/separator";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";

export const Route = createLazyFileRoute("/servers/$name")({
  component: Component,
});

function Component() {
  const { name } = useParams({
    from: "/servers/$name",
  });
  const { data } = useQuery(getServerQuery(name));

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
      {data?.eula_accepted ? (
        <p>Eula accepted</p>
      ) : (
        <div className="container max-w-6xl">
          <Eula />
          <EulaForm />
        </div>
      )}
    </main>
  );
}
