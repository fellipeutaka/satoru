use serde::Deserialize;
use std::{fs, path::Path};

use crate::{
    commands::download_spigot::{download_spigot, DownloadSpigotProps},
    utils::{create_folder::create_folder, run_server::run_server},
};

#[derive(Deserialize)]
pub struct CreateServerProps {
    pub name: String,
    pub description: String,
    pub version: String,
    pub server_dir: String,
}

#[tauri::command]
pub async fn create_server(props: CreateServerProps) -> Result<(), String> {
    let server_path = Path::new(&props.server_dir).join(&props.name);

    if server_path.exists() {
        return Err("Server already exists".to_string());
    }

    create_folder(server_path.to_str().unwrap()).await?;

    let server_props = serde_json::json!({
        "name": props.name,
        "description": props.description,
        "version": props.version,
        "ram": 1024
    })
    .to_string();
    let server_props_path = server_path.join("satoru.json");
    fs::write(server_props_path, server_props).unwrap();

    download_spigot(DownloadSpigotProps {
        server_dir: server_path.to_str().unwrap().to_string(),
        version: props.version,
    })
    .await?;

    let output = run_server(server_path.to_str().unwrap().to_string(), "1G".to_string());

    if let Ok(output) = output {
        if output.status.success() {
            Ok(())
        } else {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    } else {
        Err("Failed to execute java command".to_string())
    }
}
