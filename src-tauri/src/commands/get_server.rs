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
    pub ram_amount: u32,
    pub server_properties: ServerProperties,
    pub description: String,
}

#[tauri::command]
pub fn get_server(props: GetServerProps) -> Result<GetServerResponse, String> {
    let server_list = SERVER_LIST.lock().unwrap();

    let server_path = Path::new(&props.server_dir).join(&props.name);

    let eula_path = server_path.join("eula.txt");
    let eula = std::fs::read_to_string(eula_path).unwrap_or("eula=false".to_string());
    let eula_accepted = eula.contains("eula=true");

    // Get server.properties
    let server_properties = get_server_properties(server_path.clone());

    let satoru_json = std::fs::read_to_string(server_path.join("satoru.json")).unwrap();
    let server_props: serde_json::Value = serde_json::from_str(&satoru_json).unwrap();

    Ok(GetServerResponse {
        eula_accepted,
        server_properties,
        is_running: server_list
            .iter()
            .any(|server| server.server_path == server_path.to_str().unwrap().to_string()),
        ram_amount: server_props["ram_amount"].as_u64().unwrap_or(1024) as u32,
        description: server_props["description"]
            .as_str()
            .unwrap_or("")
            .to_string(),
    })
}
