import { createFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api";
import { useActionState } from "react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Component,
});

const invokeTauri = async () => {
  try {
    return await invoke<string>("get_java_version");
  } catch {
    return "Error getting Java version.";
  }
};

function Component() {
  const [response, handleInvoke, isPending] = useActionState(invokeTauri, null);

  return (
    <div className="">
      <h1>Welcome to Tauri!</h1>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <Button onClick={handleInvoke} disabled={isPending}>
        Invoke
      </Button>
      <p>{isPending ? "Loading..." : response}</p>
    </div>
  );
}
