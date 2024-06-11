import { Store } from "@tauri-apps/plugin-store";
import { z } from "zod";

export const settingsStore = new Store(".settings.dat");
export const settingsStoreKeys = {
  settings: "settings",
} as const;

export const settingsSchema = z.object({
  minecraftFolder: z.string().trim().min(1, "Minecraft folder is required."),
  serverFolder: z.string().trim().min(1, "Server folder is required."),
  ngrokToken: z.string().trim().min(1, "Ngrok token is required."),
});

export type Settings = z.infer<typeof settingsSchema>;
