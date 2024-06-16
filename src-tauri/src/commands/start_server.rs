use command_group::CommandGroup;
use std::{
    path::Path,
    process::{Command, Stdio},
    sync::Mutex,
};

use crate::data::servers::{Server, SERVER_LIST};

#[tauri::command]
pub fn start_server(server_path: String) -> Result<(), String> {
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

    match command {
        Ok(child) => {
            server_list.push(Server {
                server_path: server_path.clone(),
                child: Mutex::new(Some(child)),
            });

            Ok(())
        }
        Err(e) => Err(e.to_string()),
    }
}
