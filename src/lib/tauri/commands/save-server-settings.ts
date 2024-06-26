import { invoke } from "@tauri-apps/api";
import type { Difficulty } from "~/constants/difficulty";

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
