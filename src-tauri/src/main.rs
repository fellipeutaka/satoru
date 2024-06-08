// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::io::Write;

use std::process::Command;
use directories::UserDirs;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_java_version() -> Result<String, String> {
    let output = Command::new("cmd")
        .args(["/C", "javac --version"])
        .output();

    if let Ok(output) = output {
        if output.status.success() {
            return Ok(String::from_utf8_lossy(&output.stdout).to_string());
        }
    }

    let install_output = Command::new("cmd")
        .args(["/C", "winget install -e --id Oracle.JDK.17"])
        .output();

    match install_output {
        Ok(output) => {
            if output.status.success() {
                let verify_output = Command::new("cmd")
                    .args(["/C", "javac -version"])
                    .output();

                if let Ok(output) = verify_output {
                    if output.status.success() {
                        return Ok(String::from_utf8_lossy(&output.stdout).to_string());
                    }
                }
                return Err(String::from_utf8_lossy(&output.stderr).to_string());
            } else {
                return Err(String::from_utf8_lossy(&output.stderr).to_string());
            }
        },
        Err(error) => return Err(error.to_string()),
    }
}

#[tauri::command]
async fn create_server() -> Result<(), String> {

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

#[tauri::command]
async fn download_spigot() -> Result<String, String> {
    let url = "https://download.getbukkit.org/spigot/spigot-1.20.1.jar";
    let response = reqwest::get(url).await;

    match response {
        Ok(mut file) => {
            let path = UserDirs::new().unwrap().download_dir().unwrap_or_else(|| std::path::Path::new("")).join("server.jar");
            let mut dest = std::fs::File::create(path.clone()).expect("Failed to create file"); 
            while let Some(chunk) = file.chunk().await.map_err(|e| e.to_string())? {
                dest.write_all(&chunk).map_err(|e| e.to_string())?;
            }
            Ok(format!("File downloaded to {}", path.display()))
        },
        Err(err) => Err(err.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_java_version, create_server, download_spigot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}