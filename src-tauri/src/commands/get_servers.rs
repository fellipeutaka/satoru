use std::path::Path;

use chrono::{DateTime, Utc};
use ngrok::tunnel::EndpointInfo;
use serde::{Deserialize, Serialize};

use crate::{
    data::servers::SERVER_LIST,
    utils::get_server_properties::{get_server_properties, ServerProperties},
};

#[derive(Serialize, Deserialize)]
pub struct Server {
    name: String,
    path: String,
    is_running: bool,
    version: String,
    created_at: String,
    ip: String,
    player_count: u32,
    server_properties: ServerProperties,
}

#[tauri::command]
pub async fn get_servers(server_folder: String) -> Result<Vec<Server>, String> {
    let entries = std::fs::read_dir(server_folder);
    let server_list = SERVER_LIST.lock().await;

    match entries {
        Ok(entries) => {
            let mut servers: Vec<Server> = vec![];
            for entry in entries {
                if let Ok(entry) = entry {
                    let path = entry.path();
                    if path.is_dir() {
                        let server_props_path = path.join("satoru.json");
                        let server_jar_path = path.join("server.jar");
                        if server_props_path.exists() && server_jar_path.exists() {
                            let satoru_json = std::fs::read_to_string(server_props_path).unwrap();
                            let server_props: serde_json::Value =
                                serde_json::from_str(&satoru_json).unwrap();
                            let version = server_props["version"].as_str().unwrap().to_string();

                            let created_date: DateTime<Utc> =
                                DateTime::from(path.metadata().unwrap().created().unwrap());
                            let created_at = created_date.to_rfc3339();

                            let server_path = path.to_str().unwrap().to_string();

                            let server = server_list
                                .iter()
                                .find(|server| server.server_path == server_path);

                            let ip = if let Some(server) = server {
                                server
                                    .tcp_tunnel
                                    .lock()
                                    .await
                                    .url()
                                    .to_string()
                                    .replace("tcp://", "")
                            } else {
                                "".to_string()
                            };

                            servers.push(Server {
                                name: path.file_name().unwrap().to_str().unwrap().to_string(),
                                path: server_path.clone(),
                                version,
                                is_running: server.is_some(),
                                created_at,
                                ip: ip.to_string(),
                                player_count: server
                                    .map_or(0, |server| *server.player_count.lock().unwrap()),
                                server_properties: if server.is_some() {
                                    get_server_properties(Path::new(&server_path).to_path_buf())
                                } else {
                                    ServerProperties::default()
                                },
                            });
                        }
                    }
                }
            }
            Ok(servers)
        }
        Err(_) => Err("Failed to read server folder".to_string()),
    }
}
