import { invoke } from "@tauri-apps/api";

export async function stopServer(serverPath: string) {
  try {
    await invoke("stop_server", { serverPath });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to stop server");
  }
}
