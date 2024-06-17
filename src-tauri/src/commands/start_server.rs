use command_group::CommandGroup;
use ngrok::{config::TunnelBuilder, prelude::TunnelExt, tunnel::UrlTunnel};
use std::{
    io::{BufRead, BufReader},
    path::Path,
    process::{Command, Stdio},
    sync::Mutex,
    thread,
};
use tauri::Manager;

use crate::data::servers::{Server, SERVER_LIST};

#[tauri::command]
pub async fn start_server(app: tauri::AppHandle, server_path: String) -> Result<(), String> {
    let mut server_list = SERVER_LIST.lock().unwrap();

    let satoru_json_path = Path::new(&server_path).join("satoru.json");
    let satoru_json = std::fs::read_to_string(satoru_json_path).unwrap();
    let server_props: serde_json::Value = serde_json::from_str(&satoru_json).unwrap();
    let ram = server_props["ram_amount"]
        .as_str()
        .unwrap_or("1024")
        .to_owned()
        + "M";

    let command = Command::new("java")
        .current_dir(server_path.clone())
        .args([
            "-Xmx".to_string() + &ram,
            "-Xms".to_string() + &ram,
            "-jar".to_string(),
            "server.jar".to_string(),
            "nogui".to_string(),
        ])
        .stdout(Stdio::piped())
        .group_spawn();

    // let tunnel = ngrok::Session::builder()
    //     .authtoken("")
    //     .connect()
    //     .await
    //     .map_err(|e| e.to_string())?
    //     .tcp_endpoint()
    //     .listen()
    //     .await;

    // let mut unwrapped_tunnel = tunnel.unwrap();
    // unwrapped_tunnel.forward_tcp("");
    // let serverUrl = unwrapped_tunnel.url();
    // println!("Server URL: {}", serverUrl);

    match command {
        Ok(mut child) => {
            let stdout = child.inner().stdout.take();

            if let Some(stdout) = stdout {
                let reader = BufReader::new(stdout);
                let app_clone = app.clone();
                thread::spawn(move || {
                    for line in reader.lines() {
                        match line {
                            Ok(line) => {
                                #[derive(Clone, serde::Serialize)]
                                struct ServerLogPayload {
                                    message: String,
                                }

                                app_clone
                                    .emit_all("server-logs", ServerLogPayload { message: line })
                                    .unwrap();
                            }
                            Err(e) => {
                                println!("Error: {}", e);
                            }
                        }
                    }
                });
            }

            server_list.push(Server {
                server_path: server_path.clone(),
                child: Mutex::new(Some(child)),
            });

            Ok(())
        }
        Err(e) => Err(e.to_string()),
    }
}
