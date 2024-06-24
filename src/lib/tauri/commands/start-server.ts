import { invoke } from "@tauri-apps/api";

interface StartServerProps {
  serverPath: string;
  ngrokToken: string;
}

export async function startServer(props: StartServerProps) {
  try {
    await invoke("start_server", { ...props });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to run server");
  }
}
