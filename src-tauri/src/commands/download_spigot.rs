use std::io::Write;

#[tauri::command]
pub async fn download_spigot() -> Result<String, String> {
    let url = "https://download.getbukkit.org/spigot/spigot-1.20.1.jar";
    let response = reqwest::get(url).await;

    match response {
        Ok(file) => {
            // Save the file to Downloads (download_dir) folder using Rust fs
            let mut dest = std::fs::File::create("C:\\Users\\Public\\Downloads\\spigot-1.20.1.jar").unwrap();
            let content = file.bytes().await.unwrap();
            dest.write_all(&content).unwrap();
            Ok("Downloaded".to_string())
        },
        Err(err) => Err(err.to_string()),
    }
}