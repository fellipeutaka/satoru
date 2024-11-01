import { join } from "@tauri-apps/api/path";
import { cache } from "react";
import { getSettings } from "./get-settings";

export const getServerPath = cache(async (serverName: string) => {
  const { serverFolder } = await getSettings();
  return await join(serverFolder, serverName);
});
