import { invoke } from "@tauri-apps/api";

export async function getServers(serverFolder: string) {
  try {
    return await invoke<string[]>("get_servers", { serverFolder });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to get servers");
  }
}
