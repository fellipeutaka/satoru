import { invoke } from "@tauri-apps/api";
import type { ServerProperties } from "./get-server";

interface Server {
  is_running: boolean;
  name: string;
  path: string;
  version: string;
  created_at: string;
  ip: string;
  player_count: number;
  server_properties: ServerProperties;
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
