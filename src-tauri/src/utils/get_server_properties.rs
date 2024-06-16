use std::path::PathBuf;

use regex::Regex;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct ServerProperties {
    pub level_seed: String,
    pub gamemode: String,
    pub enable_command_block: bool,
    pub enable_query: bool,
    pub enforce_secure_profile: bool,
    pub level_name: String,
    pub motd: String,
    pub query_port: u16,
    pub pvp: bool,
    pub generate_structures: bool,
    pub difficulty: String,
    pub network_compression_threshold: u16,
    pub max_tick_time: u32,
    pub require_resource_pack: bool,
    pub use_native_transport: bool,
    pub max_players: u16,
    pub online_mode: bool,
    pub enable_status: bool,
    pub allow_flight: bool,
    pub broadcast_rcon_to_ops: bool,
    pub view_distance: u16,
    pub server_ip: String,
    pub allow_nether: bool,
    pub server_port: u16,
    pub enable_rcon: bool,
    pub sync_chunk_writes: bool,
    pub op_permission_level: u8,
    pub prevent_proxy_connections: bool,
    pub hide_online_players: bool,
    pub simulation_distance: u16,
    pub rcon_password: String,
    pub player_idle_timeout: u16,
    pub debug: bool,
    pub force_gamemode: bool,
    pub rate_limit: u16,
    pub hardcore: bool,
    pub white_list: bool,
    pub spawn_npcs: bool,
    pub spawn_animals: bool,
    pub log_ips: bool,
    pub function_permission_level: u8,
    pub level_type: String,
    pub spawn_monsters: bool,
    pub enforce_whitelist: bool,
    pub spawn_protection: u16,
    pub max_world_size: u32,
}

fn get_server_property(server_properties_file: String, property: &str) -> String {
    return Regex::new(&format!("{}=(.*)\n", property))
        .unwrap()
        .captures(&server_properties_file)
        .and_then(|cap| cap.get(1))
        .map(|m| m.as_str().trim().to_string())
        .unwrap_or("".to_string());
}

pub fn get_server_properties(server_path: PathBuf) -> ServerProperties {
    let server_properties_path = server_path.join("server.properties");
    let server_properties_file: String =
        std::fs::read_to_string(server_properties_path.clone()).unwrap_or("".to_string());

    return ServerProperties {
        level_seed: get_server_property(server_properties_file.clone(), "level-seed"),
        gamemode: get_server_property(server_properties_file.clone(), "gamemode"),
        enable_command_block: get_server_property(
            server_properties_file.clone(),
            "enable-command-block",
        )
        .parse::<bool>()
        .unwrap(),
        enable_query: get_server_property(server_properties_file.clone(), "enable-query")
            .parse::<bool>()
            .unwrap(),
        enforce_secure_profile: get_server_property(
            server_properties_file.clone(),
            "enforce-secure-profile",
        )
        .parse::<bool>()
        .unwrap(),
        level_name: get_server_property(server_properties_file.clone(), "level-name"),
        motd: get_server_property(server_properties_file.clone(), "motd"),
        query_port: get_server_property(server_properties_file.clone(), "query.port")
            .parse::<u16>()
            .unwrap(),
        pvp: get_server_property(server_properties_file.clone(), "pvp")
            .parse::<bool>()
            .unwrap(),
        generate_structures: get_server_property(
            server_properties_file.clone(),
            "generate-structures",
        )
        .parse::<bool>()
        .unwrap(),
        difficulty: get_server_property(server_properties_file.clone(), "difficulty"),
        network_compression_threshold: get_server_property(
            server_properties_file.clone(),
            "network-compression-threshold",
        )
        .parse::<u16>()
        .unwrap(),
        max_tick_time: get_server_property(server_properties_file.clone(), "max-tick-time")
            .parse::<u32>()
            .unwrap(),
        require_resource_pack: get_server_property(
            server_properties_file.clone(),
            "require-resource-pack",
        )
        .parse::<bool>()
        .unwrap(),
        use_native_transport: get_server_property(
            server_properties_file.clone(),
            "use-native-transport",
        )
        .parse::<bool>()
        .unwrap(),
        max_players: get_server_property(server_properties_file.clone(), "max-players")
            .parse::<u16>()
            .unwrap(),
        online_mode: get_server_property(server_properties_file.clone(), "online-mode")
            .parse::<bool>()
            .unwrap(),
        enable_status: get_server_property(server_properties_file.clone(), "enable-status")
            .parse::<bool>()
            .unwrap(),
        allow_flight: get_server_property(server_properties_file.clone(), "allow-flight")
            .parse::<bool>()
            .unwrap(),
        broadcast_rcon_to_ops: get_server_property(
            server_properties_file.clone(),
            "broadcast-rcon-to-ops",
        )
        .parse::<bool>()
        .unwrap(),
        view_distance: get_server_property(server_properties_file.clone(), "view-distance")
            .parse::<u16>()
            .unwrap(),
        server_ip: get_server_property(server_properties_file.clone(), "server-ip"),
        allow_nether: get_server_property(server_properties_file.clone(), "allow-nether")
            .parse::<bool>()
            .unwrap(),
        server_port: get_server_property(server_properties_file.clone(), "server-port")
            .parse::<u16>()
            .unwrap(),
        enable_rcon: get_server_property(server_properties_file.clone(), "enable-rcon")
            .parse::<bool>()
            .unwrap(),
        sync_chunk_writes: get_server_property(server_properties_file.clone(), "sync-chunk-writes")
            .parse::<bool>()
            .unwrap(),
        op_permission_level: get_server_property(
            server_properties_file.clone(),
            "op-permission-level",
        )
        .parse::<u8>()
        .unwrap(),
        prevent_proxy_connections: get_server_property(
            server_properties_file.clone(),
            "prevent-proxy-connections",
        )
        .parse::<bool>()
        .unwrap(),
        hide_online_players: get_server_property(
            server_properties_file.clone(),
            "hide-online-players",
        )
        .parse::<bool>()
        .unwrap(),
        simulation_distance: get_server_property(
            server_properties_file.clone(),
            "simulation-distance",
        )
        .parse::<u16>()
        .unwrap(),
        rcon_password: get_server_property(server_properties_file.clone(), "rcon.password"),
        player_idle_timeout: get_server_property(
            server_properties_file.clone(),
            "player-idle-timeout",
        )
        .parse::<u16>()
        .unwrap(),
        debug: get_server_property(server_properties_file.clone(), "debug")
            .parse::<bool>()
            .unwrap(),
        force_gamemode: get_server_property(server_properties_file.clone(), "force-gamemode")
            .parse::<bool>()
            .unwrap(),
        rate_limit: get_server_property(server_properties_file.clone(), "rate-limit")
            .parse::<u16>()
            .unwrap(),
        hardcore: get_server_property(server_properties_file.clone(), "hardcore")
            .parse::<bool>()
            .unwrap(),
        white_list: get_server_property(server_properties_file.clone(), "white-list")
            .parse::<bool>()
            .unwrap(),
        spawn_npcs: get_server_property(server_properties_file.clone(), "spawn-npcs")
            .parse::<bool>()
            .unwrap(),
        spawn_animals: get_server_property(server_properties_file.clone(), "spawn-animals")
            .parse::<bool>()
            .unwrap(),
        log_ips: get_server_property(server_properties_file.clone(), "log-ips")
            .parse::<bool>()
            .unwrap(),
        function_permission_level: get_server_property(
            server_properties_file.clone(),
            "function-permission-level",
        )
        .parse::<u8>()
        .unwrap(),
        level_type: get_server_property(server_properties_file.clone(), "level-type"),
        spawn_monsters: get_server_property(server_properties_file.clone(), "spawn-monsters")
            .parse::<bool>()
            .unwrap(),
        enforce_whitelist: get_server_property(server_properties_file.clone(), "enforce-whitelist")
            .parse::<bool>()
            .unwrap(),
        spawn_protection: get_server_property(server_properties_file.clone(), "spawn-protection")
            .parse::<u16>()
            .unwrap(),
        max_world_size: get_server_property(server_properties_file.clone(), "max-world-size")
            .parse::<u32>()
            .unwrap(),
    };
}
