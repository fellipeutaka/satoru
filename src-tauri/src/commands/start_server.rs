use command_group::CommandGroup;
use std::{
    process::{Command, Stdio},
    sync::Mutex,
};

use crate::data::servers::{Server, SERVER_LIST};

#[tauri::command]
pub fn start_server(server_path: String, ram_amount: String) -> Result<(), String> {
    let mut server_list = SERVER_LIST.lock().unwrap();

    let command = Command::new("java")
        .current_dir(server_path.clone())
        .args([
            "-Xmx".to_string() + &ram_amount,
            "-Xms".to_string() + &ram_amount,
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
