use std::fs;

use super::stop_server::stop_server;

#[tauri::command]
pub async fn delete_server(server_path: String) -> Result<(), String> {
    stop_server(server_path.clone());

    match fs::remove_dir_all(server_path) {
        Ok(_) => Ok(()),
        Err(err) => Err(err.to_string()),
    }
}
