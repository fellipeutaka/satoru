import { invoke } from "@tauri-apps/api";

interface Server {
  is_running: boolean;
  name: string;
  path: string;
  version: string;
  created_at: string;
  ip: string;
}

export async function getServers(serverFolder: string) {
  try {
    return await invoke<Server[]>("get_servers", { serverFolder });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to get servers");
  }
}
