import { invoke } from "@tauri-apps/api";

export async function getServers(serverFolder: string) {
  try {
    return await invoke<string[]>("get_servers", { serverFolder });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to get servers");
  }
}

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
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to create a server");
  }
}

interface GetServerProps {
  server_dir: string;
  name: string;
}

interface GetServerResponse {
  eula_accepted: boolean;
  status: "Running";
}

export async function getServer(props: GetServerProps) {
  try {
    return await invoke<GetServerResponse>("get_server", { props });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to create a server");
  }
}

interface AcceptTermsProps {
  server_dir: string;
  name: string;
}

export async function acceptTerms(props: AcceptTermsProps) {
  try {
    await invoke<GetServerResponse>("accept_terms", { props });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to create a server");
  }
}
