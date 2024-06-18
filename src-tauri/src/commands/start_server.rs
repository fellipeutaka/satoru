use command_group::CommandGroup;
use std::{
    io::{BufRead, BufReader},
    path::Path,
    process::{Command, Stdio},
    thread,
};
use tauri::Manager;
use tokio::sync::Mutex;

use crate::{
    data::servers::{Server, SERVER_LIST},
    utils::{get_server_properties::get_server_properties, run_ngrok::run_ngrok},
};

#[tauri::command]
pub async fn start_server(
    app: tauri::AppHandle,
    ngrok_token: String,
    server_path: String,
) -> Result<(), String> {
    let mut server_list = SERVER_LIST.lock().await;

    let server_path_buf = Path::new(&server_path);
    let satoru_json_path = server_path_buf.join("satoru.json");
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

    let server_properties = get_server_properties(server_path_buf.to_path_buf());

    let tcp_tunnel = run_ngrok(ngrok_token, server_properties.server_port).await;

    match command {
        Ok(mut child) => {
            let stdout = child.inner().stdout.take();

            if let Some(stdout) = stdout {
                let reader = BufReader::new(stdout);

                thread::spawn(move || {
                    for line in reader.lines() {
                        match line {
                            Ok(line) => {
                                app.emit_all("server-logs", line).unwrap();
                            }
                            Err(e) => {
                                println!("Error: {}", e);
                            }
                        }
                    }
                });
            }

            server_list.push(Server {
                server_path,
                child: Mutex::new(Some(child)),
                tcp_tunnel: Mutex::new(tcp_tunnel),
            });

            Ok(())
        }
        Err(e) => Err(e.to_string()),
    }
}
