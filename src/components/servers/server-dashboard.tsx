import { Card } from "../ui/card";
import { Icons } from "../ui/icons";

export function ServerDashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2 flex-1 my-6">
      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="font-semibold text-base">
            Player Count
          </Card.Title>
          <Icons.Users className="size-4" />
        </Card.Header>
        <Card.Content>
          <span className="font-bold text-2xl tracking-tight">42</span>
          <p className="text-muted-foreground text-xs">Online / 100 max</p>
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
          <span className="font-bold text-2xl tracking-tight">12.5 GB</span>
          <p className="text-muted-foreground text-xs">of 16 GB total</p>
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
