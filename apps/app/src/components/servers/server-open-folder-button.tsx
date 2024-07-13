import { useParams } from "@tanstack/react-router";
import { useTransition } from "react";
import { openFolder } from "~/lib/tauri/commands/open-folder";
import { getServerPath } from "~/utils/get-server-path";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Tooltip } from "../ui/tooltip";

export function ServerOpenFolderButton() {
  const { name } = useParams({
    from: "/servers/$name",
  });

  const [isPending, startTransition] = useTransition();

  function handleToggleServer() {
    startTransition(async () => {
      const path = await getServerPath(name);
      await openFolder(path);
    });
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={handleToggleServer}
            disabled={isPending}
          >
            <Icons.FolderOpen className="size-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Open folder</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
