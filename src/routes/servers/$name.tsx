import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useParams } from "@tanstack/react-router";
import { Header } from "~/components/layout/header";
import { ServerDashboard } from "~/components/servers/server-dashboard";
import { ServerDeleteButton } from "~/components/servers/server-delete-button";
import { ServerEulaPage } from "~/components/servers/server-eula-page";
import { ServerLogs } from "~/components/servers/server-logs";
import { ServerOpenFolderButton } from "~/components/servers/server-open-folder-button";
import { ServerSettingsForm } from "~/components/servers/server-settings-form";
import { ServerToggleButton } from "~/components/servers/server-toggle-button";
import { ButtonStyles } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { Separator } from "~/components/ui/separator";
import { Tabs } from "~/components/ui/tabs";
import { queryClient } from "~/lib/tanstack-query/client";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { getSystemInfoQuery } from "~/lib/tanstack-query/queries/get-system-info";

export const Route = createFileRoute("/servers/$name")({
  component: Component,
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(getServerQuery(params.name));
    await queryClient.ensureQueryData(getSystemInfoQuery);
  },
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
          <Icons.ChevronLeft className="mr-2 size-4" />
          Back to Servers
        </Link>
      </div>
      <Tabs className="flex flex-1 flex-col" defaultValue="dashboard">
        <div className="flex items-center justify-between">
          <Tabs.List>
            <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
            <Tabs.Trigger value="plugins">Plugins</Tabs.Trigger>
            <Tabs.Trigger value="logs">Logs</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>

          <div className="flex items-center gap-4">
            <ServerToggleButton />
            <ServerOpenFolderButton />
            <ServerDeleteButton />
          </div>
        </div>
        <Tabs.Content value="dashboard">
          <ServerDashboard />
        </Tabs.Content>
        <Tabs.Content className="h-full" value="logs">
          <ServerLogs />
        </Tabs.Content>
        <Tabs.Content value="settings">
          <ServerSettingsForm />
        </Tabs.Content>
      </Tabs>
    </main>
  );
}
