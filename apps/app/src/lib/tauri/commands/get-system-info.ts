import { invoke } from "@tauri-apps/api";

interface GetSystemInfoProps {
  serverPath: string;
}

interface GetSystemInfoResponse {
  cpu_cores: number;
  cpu_usage: number;
  memory_total: number;
  memory_used: number;
}

export async function getSystemInfo({ serverPath }: GetSystemInfoProps) {
  return await invoke<GetSystemInfoResponse>("get_system_info", { serverPath });
}
