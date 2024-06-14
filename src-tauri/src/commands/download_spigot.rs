use std::io::Write;

use serde::Deserialize;

#[derive(Deserialize)]
pub struct DownloadSpigotProps {
    pub server_dir: String,
    pub version: String,
}

#[tauri::command]
pub async fn download_spigot(props: DownloadSpigotProps) -> Result<String, String> {
    let url = format!(
        "https://download.getbukkit.org/spigot/spigot-{}.jar",
        props.version
    );
    let response = reqwest::get(url).await;

    match response {
        Ok(mut file) => {
            let path = std::path::Path::new(&props.server_dir).join("server.jar");
            let mut dest = std::fs::File::create(path.clone()).expect("Failed to create file");
            while let Some(chunk) = file.chunk().await.map_err(|e| e.to_string())? {
                dest.write_all(&chunk).map_err(|e| e.to_string())?;
            }
            Ok(format!("File downloaded to {}", path.display()))
        }
        Err(err) => Err(err.to_string()),
    }
}
