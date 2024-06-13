#[tauri::command]
pub fn get_servers(server_folder: String) -> Result<Vec<String>, String> {
    let entries = std::fs::read_dir(server_folder);

    match entries {
        Ok(entries) => {
            let mut servers = vec![];
            for entry in entries {
                if let Ok(entry) = entry {
                    let path = entry.path();
                    if path.is_dir() {
                        let server_props_path = path.join("satoru.json");
                        let server_jar_path = path.join("server.jar");
                        if server_props_path.exists() && server_jar_path.exists() {
                            servers.push(path.file_name().unwrap().to_str().unwrap().to_string());
                        }
                    }
                }
            }
            Ok(servers)
        },
        Err(_) => Err("Failed to read server folder".to_string()),
    }
}