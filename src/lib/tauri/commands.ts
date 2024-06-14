import { invoke } from "@tauri-apps/api";

interface Server {
  is_running: boolean;
  name: string;
  path: string;
  version: string;
}

export async function getServers(serverFolder: string) {
  try {
    return await invoke<Server[]>("get_servers", { serverFolder });
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
  is_running: boolean
}

export async function getServer(props: GetServerProps) {
  try {
    return await invoke<GetServerResponse>("get_server", { props });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to get server");
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
    throw new Error("Failed to accept terms");
  }
}

export async function openFolder(path: string) {
  await invoke("open_folder", { path });
}

interface ToggleServerProps {
  serverPath: string;
  ramAmount: string;
}

export async function startServer(props: ToggleServerProps) {
  try {
    await invoke<GetServerResponse>("start_server", { ...props });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to run server");
  }
}

export async function stopServer(serverPath: string) {
  try {
    await invoke<GetServerResponse>("stop_server", { serverPath });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to run server");
  }
}
