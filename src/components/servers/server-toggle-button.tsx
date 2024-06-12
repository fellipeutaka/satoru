import { useActionState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Tooltip } from "../ui/tooltip";

async function toggleServer(_: unknown, data: FormData) {
  const isRunning = data.get("isRunning") === "true";

  const loading = toast.loading(
    isRunning ? "Stopping server..." : "Starting server...",
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));

  toast.success(isRunning ? "Server stopped" : "Server started", {
    id: loading,
  });

  return !isRunning;
}

export function ServerToggleButton() {
  const [isRunning, handleToggleServer, isPending] = useActionState(
    toggleServer,
    false,
  );

  return (
    <form action={handleToggleServer}>
      <input type="hidden" name="isRunning" value={String(isRunning)} />
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button size="icon" type="submit" disabled={isPending}>
              <Icons.Play
                data-visible={isRunning}
                className="absolute size-4 scale-100 transition-transform data-[visible='true']:scale-0"
              />
              <Icons.Pause
                data-visible={isRunning}
                className="size-4 transition-transform data-[visible='false']:scale-0"
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            {isRunning ? "Stop server" : "Start server"}
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </form>
  );
}
