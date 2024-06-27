import { invoke } from "@tauri-apps/api";

export async function installJava() {
  try {
    return await invoke<string>("install_java");
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
  }
}
