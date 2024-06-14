use serde::{Deserialize, Serialize};

use crate::data::servers::SERVER_LIST;

#[derive(Serialize, Deserialize)]
pub struct Server {
    name: String,
    path: String,
    is_running: bool,
    version: String,
}

#[tauri::command]
pub fn get_servers(server_folder: String) -> Result<Vec<Server>, String> {
    let entries = std::fs::read_dir(server_folder);
    let server_list = SERVER_LIST.lock().unwrap();

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
                            // Get version on satoru.json
                            let satoru_json = std::fs::read_to_string(server_props_path).unwrap();
                            let server_props: serde_json::Value =
                                serde_json::from_str(&satoru_json).unwrap();
                            let version = server_props["version"]
                                .as_str()
                                .unwrap_or("1.16.5")
                                .to_string();

                            servers.push(Server {
                                name: path.file_name().unwrap().to_str().unwrap().to_string(),
                                path: path.to_str().unwrap().to_string(),
                                version,
                                is_running: server_list.iter().any(|server| {
                                    server.server_path == path.to_str().unwrap().to_string()
                                }),
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
