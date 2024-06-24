import { invoke } from "@tauri-apps/api";

export async function getJavaVersion() {
  try {
    return await invoke<string>("get_java_version");
  } catch (err) {
    switch (err) {
      case "program not found":
        return null;
      default:
        throw new Error("Failed to get Java version");
    }
  }
}
