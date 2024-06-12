import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useParams } from "@tanstack/react-router";
import { Header } from "~/components/layout/header";
import { ServerDashboard } from "~/components/servers/server-dashboard";
import { ServerEulaPage } from "~/components/servers/server-eula-page";
import { ServerToggleButton } from "~/components/servers/server-toggle-button";
import { ButtonStyles } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { Separator } from "~/components/ui/separator";
import { Tabs } from "~/components/ui/tabs";
import { queryClient } from "~/lib/tanstack-query/client";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";

export const Route = createFileRoute("/servers/$name")({
  component: Component,
  loader: ({ params }) =>
    queryClient.ensureQueryData(getServerQuery(params.name)),
});

function Component() {
  const { name } = useParams({
    from: "/servers/$name",
  });
  const { data } = useSuspenseQuery(getServerQuery(name));

  if (!data.eula_accepted) {
    return <ServerEulaPage />;
  }

  return (
    <main className="shell">
      <Header
        title="Server"
        description="This is the server page. You can manage, start, and change the server settings."
      />
      <Separator />
      <div>
        <Link to="/servers" className={ButtonStyles({ variant: "outline" })}>
          <Icons.ChevronLeft className="size-4 mr-2" />
          Back to Servers
        </Link>
      </div>
      <Tabs defaultValue="dashboard">
        <div className="flex justify-between items-center">
          <Tabs.List>
            <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
            <Tabs.Trigger value="plugins">Plugins</Tabs.Trigger>
            <Tabs.Trigger value="logs">Logs</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>

          <div>
            <ServerToggleButton />
          </div>
        </div>
        <Tabs.Content value="dashboard">
          <ServerDashboard />
        </Tabs.Content>
      </Tabs>
    </main>
  );
}
