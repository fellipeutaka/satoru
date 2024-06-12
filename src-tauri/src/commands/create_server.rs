use std::process::Command;

use crate::commands::download_spigot::download_spigot;

#[tauri::command]
pub async fn create_server() -> Result<(), String> {

    download_spigot().await?;

    let downloads_path = directories::UserDirs::new()
        .and_then(|dirs| dirs.download_dir().map(|p| p.to_path_buf()))
        .ok_or_else(|| "Cannot find downloads directory".to_string())?
        .join("server.jar"); // Specify your JAR file or Java application name

        println!("{:?}", downloads_path);
    let output = Command::new("powershell")
        .args(&["-Command", &format!("java -Xmx1024M -Xms1024M -jar {}", downloads_path.display())])
        .arg("nogui")
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