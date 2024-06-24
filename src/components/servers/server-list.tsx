import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getServersQuery } from "~/lib/tanstack-query/queries/get-servers";
import { cn } from "~/lib/utils";
import { Badge } from "../ui/badge";
import { ButtonStyles } from "../ui/button";
import { Card } from "../ui/card";
import { Icons } from "../ui/icons";
import { Separator } from "../ui/separator";
import { NewServerDialog } from "./new-server-dialog";
import { ServerListEmpty } from "./server-list-empty";

export function ServerList() {
  const { data: servers } = useSuspenseQuery(getServersQuery);

  const isListEmpty = servers?.length === 0;

  if (isListEmpty) {
    return <ServerListEmpty />;
  }

  return (
    <section>
      <NewServerDialog />
      <div className="mt-6 grid gap-4 lg:grid-cols-3 md:grid-cols-2">
        {servers?.map((server) => (
          <Card key={server.id}>
            <Card.Header className="space-y-2">
              <Card.Title className="truncate py-1">{server.name}</Card.Title>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">
                  <div
                    className={cn(
                      "mr-2 h-2 w-2 rounded-full",
                      server.isRunning ? "bg-green-500" : "bg-red-500",
                    )}
                    aria-hidden
                  />
                  {server.isRunning ? "Online" : "Offline"}
                </Badge>
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="secondary">{server.version}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Icons.Users className="size-4" />
                {server.isRunning ? server.onlinePlayers : "-"}
              </div>
            </Card.Header>
            <Card.Content>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Created:</span>
                  <span>{server.createdAt.toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>IP Address:</span>
                  <span>{server.isRunning ? server.ip : "-"}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Players Online:</span>
                  <span>
                    {server.isRunning
                      ? `${server.onlinePlayers}/${server.maxPlayers}`
                      : "-/-"}
                  </span>
                </div>
              </div>
            </Card.Content>
            <Card.Footer className="justify-end">
              <Link
                to="/servers/$name"
                params={{
                  name: server.name,
                }}
                className={ButtonStyles({
                  variant: "outline",
                })}
              >
                See more details
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
}
