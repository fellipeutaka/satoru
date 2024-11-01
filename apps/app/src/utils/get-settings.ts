import { dataDir, desktopDir, join } from "@tauri-apps/api/path";
import {
  settingsSchema,
  settingsStore,
  settingsStoreKeys,
} from "~/store/settings";

export async function getSettings() {
  const data = settingsSchema.safeParse(
    await settingsStore.get(settingsStoreKeys.settings)
  );
  if (data.success) {
    return data.data;
  }

  const [minecraftFolder, serverFolder] = await Promise.all([
    join(await dataDir(), ".minecraft"),
    join(await desktopDir(), "servers"),
  ]);

  return {
    minecraftFolder,
    serverFolder,
    ngrokToken: "",
  };
}
