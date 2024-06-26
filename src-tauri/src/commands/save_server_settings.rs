use regex::Regex;
use std::path::Path;

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct SaveServerSettingsProps {
    pub server_path: String,
    pub ram_in_gb: u16,
    pub description: String,
    pub port: u16,
    pub max_players: u16,
    pub online_mode: bool,
    pub difficulty: String,
    pub hardcore: bool,
    pub allow_nether: bool,
    pub pvp: bool,
}

#[tauri::command]
pub fn save_server_settings(props: SaveServerSettingsProps) -> Result<(), String> {
    let server_path = Path::new(&props.server_path);

    let server_properties_path = server_path.join("server.properties");
    let server_properties =
        std::fs::read_to_string(server_properties_path.clone()).unwrap_or("".to_string());

    let mut new_server_properties = server_properties.clone();
    new_server_properties = Regex::new(&format!("max-players=.*\n"))
        .unwrap()
        .replace(
            &new_server_properties,
            format!("max-players={}\n", props.max_players).as_str(),
        )
        .to_string();
    new_server_properties = Regex::new(&format!("server-port=.*\n"))
        .unwrap()
        .replace(
            &new_server_properties,
            format!("server-port={}\n", props.port).as_str(),
        )
        .to_string();
    new_server_properties = Regex::new(&format!("online-mode=.*\n"))
        .unwrap()
        .replace(
            &new_server_properties,
            format!("online-mode={}\n", props.online_mode).as_str(),
        )
        .to_string();
    new_server_properties = Regex::new(&format!("difficulty=.*\n"))
        .unwrap()
        .replace(
            &new_server_properties,
            format!("difficulty={}\n", props.difficulty).as_str(),
        )
        .to_string();
    new_server_properties = Regex::new(&format!("hardcore=.*\n"))
        .unwrap()
        .replace(
            &new_server_properties,
            format!("hardcore={}\n", props.hardcore).as_str(),
        )
        .to_string();
    new_server_properties = Regex::new(&format!("allow-nether=.*\n"))
        .unwrap()
        .replace(
            &new_server_properties,
            format!("allow-nether={}\n", props.allow_nether).as_str(),
        )
        .to_string();
    new_server_properties = Regex::new(&format!("pvp=.*\n"))
        .unwrap()
        .replace(
            &new_server_properties,
            format!("pvp={}\n", props.pvp).as_str(),
        )
        .to_string();

    std::fs::write(server_properties_path, new_server_properties).unwrap();

    let satoru_json = std::fs::read_to_string(server_path.join("satoru.json")).unwrap();
    let server_props: serde_json::Value = serde_json::from_str(&satoru_json).unwrap();

    let mut new_server_props = server_props.clone();
    new_server_props["ram"] = serde_json::Value::from(props.ram_in_gb * 1024);
    new_server_props["description"] = serde_json::Value::from(props.description);

    std::fs::write(
        server_path.join("satoru.json"),
        new_server_props.to_string(),
    )
    .unwrap();

    Ok(())
}
