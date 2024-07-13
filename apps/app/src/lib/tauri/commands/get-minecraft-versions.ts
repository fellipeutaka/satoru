import { invoke } from "@tauri-apps/api";

export async function getMinecraftVersions(software: string) {
  try {
    return await invoke<
      {
        version: string;
        download_url: string;
      }[]
    >("get_minecraft_versions", { software });
  } catch (err) {
    switch (err) {
      default:
        throw new Error("Failed to get Minecraft versions");
    }
  }
}
