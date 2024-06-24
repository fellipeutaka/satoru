import { invoke } from "@tauri-apps/api";
import type { Difficulty } from "~/constants/dificulty";
import { ServerNotFoundError } from "../errors/server-not-found-error";

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
    switch (err) {
      case "Server does not exist":
        throw new ServerNotFoundError();
      default:
        throw new Error("Failed to get a server");
    }
  }
}
