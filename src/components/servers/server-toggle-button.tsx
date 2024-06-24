import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { join } from "@tauri-apps/api/path";
import { useActionState } from "react";
import { toast } from "sonner";
import { queryClient } from "~/lib/tanstack-query/client";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { startServer } from "~/lib/tauri/commands/start-server";
import { stopServer } from "~/lib/tauri/commands/stop-server";
import { getSettings } from "~/utils/get-settings";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Tooltip } from "../ui/tooltip";

function toggleServerAction(name: string, isRunning: boolean) {
  return async (_: unknown) => {
    const { serverFolder, ngrokToken } = await getSettings();
    const serverPath = await join(serverFolder, name);

    const loading = toast.loading(
      isRunning ? "Stopping server..." : "Starting server...",
    );

    if (isRunning) {
      await stopServer(serverPath);
      await queryClient.invalidateQueries({
        queryKey: getServerQuery(name).queryKey,
      });

      toast.success("Server stopped", {
        id: loading,
      });

      return;
    }

    await startServer({
      serverPath,
      ngrokToken,
    });
    await queryClient.invalidateQueries({
      queryKey: getServerQuery(name).queryKey,
    });

    toast.success("Server started", {
      id: loading,
    });
  };
}

export function ServerToggleButton() {
  const { name } = useParams({
    from: "/servers/$name",
  });

  const { data } = useSuspenseQuery(getServerQuery(name));

  const [_, handleToggleServer, isPending] = useActionState(
    toggleServerAction(name, data.is_running),
    null,
  );

  return (
    <form action={handleToggleServer}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button size="icon" type="submit" disabled={isPending}>
              <Icons.Play
                data-visible={data.is_running}
                className="absolute size-4 scale-100 transition-transform data-[visible='true']:scale-0"
              />
              <Icons.Ban
                data-visible={data.is_running}
                className="size-4 transition-transform data-[visible='false']:scale-0"
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            {data.is_running ? "Stop server" : "Start server"}
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </form>
  );
}
