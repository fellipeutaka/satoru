import { invoke } from "@tauri-apps/api";

export async function getServers(serverFolder: string) {
  return await invoke<string[]>("get_servers", { serverFolder });
}
