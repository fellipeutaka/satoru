use std::{path::Path, process::Command};
use serde::Deserialize;

use crate::{commands::download_spigot::{download_spigot, DownloadSpigotProps}, utils::create_folder::create_folder};

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
    create_folder(server_path.to_str().unwrap()).await?;

    download_spigot(DownloadSpigotProps {
        server_dir: server_path.to_str().unwrap().to_string(),
        version: props.version,
    }).await?;

    let output = Command::new("java")
        .current_dir(server_path)
        .args(["-Xmx1024M", "-Xms1024M", "-jar", "server.jar", "nogui"])
        .output();

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