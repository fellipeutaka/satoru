use process_wrap::std::{CreationFlags, JobObject, StdCommandWrap};
use regex::Regex;
use std::{
    io::{BufRead, BufReader},
    os::windows::process::CommandExt,
    path::Path,
    process::Stdio,
    time::Instant,
};
use tauri::{async_runtime::spawn, Manager};
use tokio::sync::Mutex;
use windows::Win32::System::Threading::CREATE_NO_WINDOW;

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
    let ram = server_props["ram"].as_str().unwrap_or("1024").to_owned() + "M";

    let mut command = StdCommandWrap::with_new("java", |command| {
        command
            .current_dir(server_path.clone())
            .args([
                "-Xmx".to_string() + &ram,
                "-Xms".to_string() + &ram,
                "-jar".to_string(),
                "server.jar".to_string(),
                "nogui".to_string(),
            ])
            .creation_flags(CREATE_NO_WINDOW.0)
            .stdin(Stdio::piped())
            .stdout(Stdio::piped());
    });

    #[cfg(unix)]
    {
        command.wrap(ProcessGroup::leader());
    }
    #[cfg(windows)]
    {
        command
            .wrap(JobObject)
            .wrap(CreationFlags(CREATE_NO_WINDOW));
    }

    let server_properties = get_server_properties(server_path_buf.to_path_buf());

    let tcp_tunnel = run_ngrok(ngrok_token, server_properties.server_port).await;

    let joined_regex =
        Regex::new(r"\[User Authenticator #\d+/INFO\]: UUID of player (.+) is .+").unwrap();
    let left_regex = Regex::new(r"\[Server thread/INFO\]: (.+) left the game").unwrap();

    match command.spawn() {
        Ok(mut child) => {
            let stdout = child.stdout().take();

            if let Some(stdout) = stdout {
                let reader = BufReader::new(stdout);
                let server_path_clone = server_path.clone();

                spawn(async move {
                    for line in reader.lines() {
                        match line {
                            Ok(line) => {
                                let server_list = SERVER_LIST.lock().await;
                                let current_server = server_list
                                    .iter()
                                    .find(|server| server.server_path == server_path_clone);

                                let mut player_count = match current_server {
                                    Some(server) => server.player_count.lock().unwrap(),
                                    None => continue,
                                };

                                if joined_regex.is_match(&line) {
                                    *player_count += 1;
                                } else if left_regex.is_match(&line) {
                                    *player_count -= 1;
                                }

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
                start_time: Instant::now(),
                player_count: std::sync::Mutex::new(0),
            });

            Ok(())
        }
        Err(e) => Err(e.to_string()),
    }
}
