import { useSuspenseQuery } from "@tanstack/react-query";
import { getServersQuery } from "~/lib/tanstack-query/queries/get-servers";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
    <div>
      <NewServerDialog />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {servers?.map((server) => (
          <Card key={server.id}>
            <Card.Header className="space-y-2">
              <Card.Title className="truncate py-1">{server.name}</Card.Title>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">
                  <div
                    className="w-2 h-2 rounded-full bg-green-500 mr-2"
                    aria-hidden
                  />
                  Online
                </Badge>
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="secondary">{server.version}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Icons.Users className="size-4" />
                {server.onlinePlayers}
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
                  <span>{server.ip}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Players Online:</span>
                  <span>
                    {server.onlinePlayers}/{server.maxPlayers}
                  </span>
                </div>
              </div>
            </Card.Content>
            <Card.Footer className="justify-end">
              <Button variant="outline">See more details</Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
}
