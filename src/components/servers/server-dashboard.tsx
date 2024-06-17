import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { getSystemInfoQuery } from "~/lib/tanstack-query/queries/get-system-info";
import { Card } from "../ui/card";
import { Icons } from "../ui/icons";

export function ServerDashboard() {
  const { data: systemInfo } = useSuspenseQuery(getSystemInfoQuery);

  const { name } = useParams({
    from: "/servers/$name",
  });
  const { data: server } = useSuspenseQuery(getServerQuery(name));

  return (
    <div className="my-6 grid flex-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">
            Player Count
          </Card.Title>
          <Icons.Users className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">42</span>
          <p className="text-muted-foreground text-xs">
            {server.is_running ? "Online" : "Offline"} /{" "}
            {server.server_properties.max_players} max
          </p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">Uptime</Card.Title>
          <Icons.Clock className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">7d 12h 34m</span>
          <p className="text-muted-foreground text-xs">Continuously running</p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">CPU Usage</Card.Title>
          <Icons.Cpu className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">68%</span>
          <p className="text-muted-foreground text-xs">of 8 cores</p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">
            Memory Usage
          </Card.Title>
          <Icons.MemoryStick className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">
            {systemInfo.memoryUsed} GB
          </span>
          <p className="text-muted-foreground text-xs">
            of {systemInfo.memoryTotal} GB total
          </p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">
            Disk Usage
          </Card.Title>
          <Icons.HardDrive className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">85 GB</span>
          <p className="text-muted-foreground text-xs">of 500 GB total</p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">
            Network Traffic
          </Card.Title>
          <Icons.Network className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">125 Mbps</span>
          <p className="text-muted-foreground text-xs">
            Inbound / 75 Mbps Outbound
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
