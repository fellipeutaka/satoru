import { invoke } from "@tauri-apps/api";
import type { Difficulty } from "~/constants/dificulty";

interface Server {
  is_running: boolean;
  name: string;
  path: string;
  version: string;
  created_at: string;
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
  is_running: boolean;
  ram_amount: number;
  description: string;
  server_properties: {
    level_seed: string;
    gamemode: string;
    enable_command_block: boolean;
    enable_query: boolean;
    enforce_secure_profile: boolean;
    level_name: string;
    motd: string;
    query_port: number;
    pvp: boolean;
    generate_structures: boolean;
    difficulty: Difficulty;
    network_compression_threshold: number;
    max_tick_time: number;
    require_resource_pack: boolean;
    use_native_transport: boolean;
    max_players: number;
    online_mode: boolean;
    enable_status: boolean;
    allow_flight: boolean;
    broadcast_rcon_to_ops: boolean;
    view_distance: number;
    server_ip: string;
    allow_nether: boolean;
    server_port: number;
    enable_rcon: boolean;
    sync_chunk_writes: boolean;
    op_permission_level: number;
    prevent_proxy_connections: boolean;
    hide_online_players: boolean;
    simulation_distance: number;
    rcon_password: string;
    player_idle_timeout: number;
    debug: boolean;
    force_gamemode: boolean;
    rate_limit: number;
    hardcore: boolean;
    white_list: boolean;
    spawn_npcs: boolean;
    spawn_animals: boolean;
    log_ips: boolean;
    function_permission_level: number;
    level_type: string;
    spawn_monsters: boolean;
    enforce_whitelist: boolean;
    spawn_protection: number;
    max_world_size: number;
  };
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

export async function startServer(serverPath: string) {
  try {
    await invoke<GetServerResponse>("start_server", { serverPath });
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
    throw new Error("Failed to stop server");
  }
}

export async function deleteServer(serverPath: string) {
  try {
    await invoke<GetServerResponse>("delete_server", { serverPath });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to delete server");
  }
}

interface GetSystemInfoResponse {
  memory_total: number;
  memory_used: number;
  cpu_cores: number;
}

export async function getSystemInfo() {
  return await invoke<GetSystemInfoResponse>("get_system_info");
}

interface SaveServerSettingsProps {
  server_path: string;
  ram_in_gb: number;
  description: string;
  port: number;
  max_players: number;
  online_mode: boolean;
  difficulty: Difficulty;
  hardcore: boolean;
  allow_nether: boolean;
  pvp: boolean;
}

export async function saveServerSettings(props: SaveServerSettingsProps) {
  return await invoke("save_server_settings", { props });
}
