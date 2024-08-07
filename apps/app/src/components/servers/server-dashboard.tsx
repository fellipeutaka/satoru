import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { getSystemInfoQuery } from "~/lib/tanstack-query/queries/get-system-info";
import { Card } from "../ui/card";
import { Icons } from "../ui/icons";

function formatUptime(uptime: number) {
  const seconds = uptime % 60;
  const minutes = Math.floor(uptime / 60) % 60;
  const hours = Math.floor(uptime / 3600) % 24;
  const days = Math.floor(uptime / 86400) % 7;
  const weeks = Math.floor(uptime / 604800) % 4;
  const months = Math.floor(uptime / 2592000) % 12;
  const years = Math.floor(uptime / 31536000);

  let formattedUptime = "";
  if (years > 0) {
    formattedUptime += `${years}y `;
  }
  if (months > 0) {
    formattedUptime += `${months}m `;
  }
  if (weeks > 0) {
    formattedUptime += `${weeks}w `;
  }
  if (days > 0) {
    formattedUptime += `${days}d `;
  }
  if (hours > 0) {
    formattedUptime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedUptime += `${minutes}m `;
  }
  if (seconds > 0) {
    formattedUptime += `${seconds}s`;
  }

  return formattedUptime.trim();
}

export function ServerDashboard() {
  const { data: systemInfo } = useSuspenseQuery(getSystemInfoQuery);

  const { name } = useParams({
    from: "/servers/$name",
  });
  const { data: server } = useSuspenseQuery(getServerQuery(name));

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
            {server.is_running ? "68%" : "-"}
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
