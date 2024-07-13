import { invoke } from "@tauri-apps/api";

export async function openFolder(path: string) {
  await invoke("open_folder", { path });
}
