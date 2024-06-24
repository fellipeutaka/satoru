import { invoke } from "@tauri-apps/api";

export async function deleteServer(serverPath: string) {
  try {
    await invoke("delete_server", { serverPath });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to delete server");
  }
}
