import { invoke } from "@tauri-apps/api";
import { ServerAlreadyExistsError } from "../errors/server-already-exists-error";

interface CreateServerProps {
  name: string;
  description: string;
  version: string;
  server_dir: string;
}

export async function createServer(props: CreateServerProps) {
  try {
    await invoke("create_server", { props });
  } catch (err) {
    if (typeof err !== "string") {
      throw new Error("Failed to create a server");
    }

    switch (err) {
      case "Server already exists":
        throw new ServerAlreadyExistsError();
      default:
        throw new Error(err);
    }
  }
}
