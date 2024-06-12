use std::path::Path;

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct GetServerProps {
    pub server_dir: String,
    pub name: String,
}

#[derive(Deserialize)]
pub enum Difficulty {
    Peaceful,
    Easy,
    Normal,
    Hard,
}

#[derive(Deserialize)]
pub enum Gamemode {
    Survival,
    Creative,
    Adventure,
    Spectator,
}

#[derive(Deserialize)]
pub struct ServerProperties {
    pub enable_jmx_monitoring: bool,
    pub rcon_port: u16,
    pub level_seed: String,
    pub gamemode: Gamemode,
    pub enable_command_block: bool,
    pub enable_query: bool,
    // pub generator_settings: String,
    pub enforce_secure_profile: bool,
    pub level_name: String,
    pub motd: String,
    pub query_port: u16,
    pub pvp: bool,
    pub generate_structures: bool,
    pub max_chained_neighbor_updates: u32,
    pub difficulty: Difficulty,
    pub network_compression_threshold: u16,
    pub max_tick_time: u32,
    pub require_resource_pack: bool,
    pub use_native_transport: bool,
    pub max_players: u16,
    pub online_mode: bool,
    pub enable_status: bool,
    pub allow_flight: bool,
    // pub initial_disabled_packs: String,
    pub broadcast_rcon_to_ops: bool,
    pub view_distance: u16,
    pub server_ip: String,
    // pub resource_pack_prompt: String,
    pub allow_nether: bool,
    pub server_port: u16,
    pub enable_rcon: bool,
    pub sync_chunk_writes: bool,
    // pub resource_pack_id: String,
    pub op_permission_level: u8,
    pub prevent_proxy_connections: bool,
    pub hide_online_players: bool,
    // pub resource_pack: String,
    pub entity_broadcast_range_percentage: u8,
    pub simulation_distance: u16,
    pub rcon_password: String,
    pub player_idle_timeout: u16,
    pub debug: bool,
    pub force_gamemode: bool,
    pub rate_limit: u16,
    pub hardcore: bool,
    pub white_list: bool,
    pub broadcast_console_to_ops: bool,
    pub spawn_npcs: bool,
    pub spawn_animals: bool,
    pub log_ips: bool,
    pub function_permission_level: u8,
    pub initial_enabled_packs: String,
    pub level_type: String,
    // pub text_filtering_config: String,
    pub spawn_monsters: bool,
    pub enforce_whitelist: bool,
    pub spawn_protection: u16,
    // pub resource_pack_sha1: String,
    pub max_world_size: u32,
}

#[derive(Deserialize, Serialize)]
pub enum ServerStatus {
    Running,
    Stopped,
}

#[derive(Deserialize, Serialize)]
pub struct GetServerResponse {
    pub eula_accepted: bool,
    // pub server_properties: ServerProperties,
    pub status: ServerStatus,
}

// The function get_server will return the following properties:
// Server.properties
// EULA (End User License Agreement)

// Minecraft EULA example:
/*
#By changing the setting below to TRUE you are indicating your agreement to our EULA (https://aka.ms/MinecraftEULA).
#Wed Jun 12 10:29:51 BRT 2024
eula=false
*/

#[tauri::command]
pub fn get_server(props: GetServerProps) -> Result<GetServerResponse, String> {
    let server_path = Path::new(&props.server_dir).join(&props.name);
    let files = std::fs::read_dir(server_path.clone());

    // Get if EULA is accepted
    let eula_path = server_path.join("eula.txt");
    let eula = std::fs::read_to_string(eula_path).unwrap_or("eula=false".to_string());
    let eula_accepted = eula.contains("eula=true");

    // Get server.properties
    let server_properties_path = server_path.join("server.properties");
    let server_properties = std::fs::read_to_string(server_properties_path).unwrap_or("".to_string());

    let status = match files {
        Ok(_) => ServerStatus::Running,
        Err(_) => ServerStatus::Stopped,
    };

    Ok(GetServerResponse {
        eula_accepted,
        // server_properties,
        status,
    })
}