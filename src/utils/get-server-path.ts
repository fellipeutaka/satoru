import { join } from "@tauri-apps/api/path";
import { getSettings } from "./get-settings";

export async function getServerPath(serverName: string) {
  const { serverFolder } = await getSettings();
  return await join(serverFolder, serverName);
}
