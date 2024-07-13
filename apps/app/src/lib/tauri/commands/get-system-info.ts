import { invoke } from "@tauri-apps/api";

interface GetSystemInfoResponse {
  memory_total: number;
  memory_used: number;
  cpu_cores: number;
}

export async function getSystemInfo() {
  return await invoke<GetSystemInfoResponse>("get_system_info");
}
