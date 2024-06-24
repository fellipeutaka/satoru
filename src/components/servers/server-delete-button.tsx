import { useParams, useRouter } from "@tanstack/react-router";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteServer } from "~/lib/tauri/commands/delete-server";
import { getServerPath } from "~/utils/get-server-path";
import { AlertDialog } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Tooltip } from "../ui/tooltip";

export function ServerDeleteButton() {
  const { name } = useParams({
    from: "/servers/$name",
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDeleteServer() {
    startTransition(async () => {
      const serverPath = await getServerPath(name);

      const loading = toast.loading("Deleting server...");

      await deleteServer(serverPath);

      toast.success("Server deleted", {
        id: loading,
      });

      await router.navigate({
        to: "/servers",
        replace: true,
      });
    });
  }

  return (
    <AlertDialog>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <AlertDialog.Trigger asChild>
              <Button
                variant="destructive"
                size="icon"
                aria-label="Delete server"
              >
                <Icons.Trash aria-hidden className="size-4" />
              </Button>
            </AlertDialog.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Content>Delete server</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            variant="destructive"
            onClick={handleDeleteServer}
            disabled={isPending}
          >
            Continue
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
