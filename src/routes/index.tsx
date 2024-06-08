import { createFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api";
import { useActionState } from "react";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Component,
});

const invokeTauri = async () => {
  try {
    return await invoke<string>("get_java_version");
  } catch {
    return "Please install java in your system first.";
  }
};

const createServer = async () => {
  try {
    return await invoke<string>("create_server");
  } catch(error) {
    return "Error: " + error + " Please install java in your system first.";
  }
};

function Component() {
  const [response, handleInvoke, isPending] = useActionState(invokeTauri, null);
  const [responseServer, handleCreateServer, isPendingServer] = useActionState(createServer, null);

  return (
    <div className="">
      <h1>Welcome to Tauri!</h1>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <Button onClick={handleInvoke} disabled={isPending} className="flex items-center gap-2">
        Get Java Version <Icons.Java className="size-6"/>
      </Button>
      <p>{isPending ? "Loading..." : response}</p>

      <Button onClick={() => handleCreateServer()} className="flex items-center gap-2"> Create Server </Button>
      <p>{isPendingServer ? "Loading..." : responseServer}</p>
    </div>
  );
}
