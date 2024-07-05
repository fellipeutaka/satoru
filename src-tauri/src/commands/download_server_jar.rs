use std::io::Write;

use serde::Deserialize;

use crate::utils::get_server_jar_download_url::get_server_jar_download_url;

#[derive(Deserialize)]
pub struct DownloadServerJarProps {
    pub server_dir: String,
    pub download_url: String,
}

#[tauri::command]
pub async fn download_server_jar(props: DownloadServerJarProps) -> Result<(), String> {
    let server_jar_url = get_server_jar_download_url(props.download_url).await;

    let response = reqwest::get(server_jar_url).await;

    match response {
        Ok(mut file) => {
            let path = std::path::Path::new(&props.server_dir).join("server.jar");
            let mut dest = std::fs::File::create(path).expect("Failed to create file");
            while let Some(chunk) = file.chunk().await.map_err(|e| e.to_string())? {
                dest.write_all(&chunk).map_err(|e| e.to_string())?;
            }
            Ok(())
        }
        Err(err) => Err(err.to_string()),
    }
}
