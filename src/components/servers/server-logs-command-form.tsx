import { useParams } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api";
import { useActionState } from "react";
import { getServerPath } from "~/utils/get-server-path";
import { Input } from "../ui/input";

function runCommand(serverName: string) {
  return async (_: unknown, data: FormData) => {
    const command = data.get("command");
    const serverPath = await getServerPath(serverName);

    await invoke("run_server_command", { serverPath, command });
  };
}

export function ServerLogsCommandForm() {
  const { name } = useParams({
    from: "/servers/$name",
  });
  const [_, handleSubmit, isPending] = useActionState(runCommand(name), null);

  return (
    <form action={handleSubmit}>
      <Input
        name="command"
        disabled={isPending}
        className="mt-4"
        placeholder="Enter a command..."
      />
    </form>
  );
}
