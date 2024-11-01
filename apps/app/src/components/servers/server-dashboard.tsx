import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { getSystemInfoQuery } from "~/lib/tanstack-query/queries/get-system-info";
import { formatCpuUsage } from "~/utils/format-cpu-usage";
import { formatUptime } from "~/utils/format-uptime";
import { Card } from "../ui/card";
import { Icons } from "../ui/icons";

export function ServerDashboard() {
  const { name } = useParams({
    from: "/servers/$name",
  });
  const { data: server } = useSuspenseQuery(getServerQuery(name));
  const { data: systemInfo } = useSuspenseQuery({
    ...getSystemInfoQuery(name),
    refetchInterval: server.is_running ? 2000 : false,
  });
  const [uptime, setUptime] = useState(server.start_time);

  useEffect(() => {
    if (server.is_running) {
      const interval = setInterval(() => {
        setUptime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    setUptime(0);
  }, [server.is_running]);

  return (
    <div className="my-6 grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">
            Player Count
          </Card.Title>
          <Icons.Users className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">
            {server.is_running ? server.player_count : "-"}
          </span>
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
          <span className="font-bold text-2xl tracking-tight">
            {formatUptime(uptime) || "-"}
          </span>
          <p className="text-muted-foreground text-xs">Continuously running</p>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">CPU Usage</Card.Title>
          <Icons.Cpu className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">
            {server.is_running ? formatCpuUsage(systemInfo.cpuUsage) : "-"}
          </span>
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
            {server.is_running ? `${systemInfo.memoryUsed} GB` : "-"}
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
          <span className="font-bold text-2xl tracking-tight">
            {server.is_running ? "8 GB" : "-"}
          </span>
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
          <span className="font-bold text-2xl tracking-tight">
            {server.is_running ? "125 Mbps" : "-"}
          </span>
          <p className="text-muted-foreground text-xs">
            Inbound / 75 Mbps Outbound
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
