use std::path::Path;

use serde::{Deserialize, Serialize};

use crate::{
    data::servers::SERVER_LIST,
    utils::get_server_properties::{get_server_properties, ServerProperties},
};

#[derive(Deserialize)]
pub struct GetServerProps {
    pub server_dir: String,
    pub name: String,
}

#[derive(Deserialize, Serialize)]
pub struct GetServerResponse {
    pub eula_accepted: bool,
    pub is_running: bool,
    pub ram: u64,
    pub server_properties: ServerProperties,
    pub description: String,
    pub start_time: u64,
    pub player_count: u32,
}

#[tauri::command]
pub async fn get_server(props: GetServerProps) -> Result<GetServerResponse, String> {
    let server_list = SERVER_LIST.lock().await;

    let server_path = Path::new(&props.server_dir).join(&props.name);

    if !server_path.exists() {
        return Err("Server does not exist".to_string());
    }

    let eula_path = server_path.join("eula.txt");
    let eula = std::fs::read_to_string(eula_path).unwrap_or("eula=false".to_string());
    let eula_accepted = eula.contains("eula=true");

    let server_properties = get_server_properties(server_path.clone());

    let satoru_json = std::fs::read_to_string(server_path.join("satoru.json")).unwrap();
    let server_props: serde_json::Value = serde_json::from_str(&satoru_json).unwrap();
    let server = server_list
        .iter()
        .find(|server| server.server_path == server_path.to_str().unwrap().to_string());

    Ok(GetServerResponse {
        eula_accepted,
        server_properties,
        is_running: server_list
            .iter()
            .any(|server| server.server_path == server_path.to_str().unwrap().to_string()),
        ram: server_props["ram"].as_u64().unwrap_or(1024),
        description: server_props["description"]
            .as_str()
            .unwrap_or("")
            .to_string(),
        start_time: server
            .map(|server| server.start_time.elapsed().as_secs())
            .unwrap_or(0),
        player_count: server.map_or(0, |server| *server.player_count.lock().unwrap()),
    })
}
