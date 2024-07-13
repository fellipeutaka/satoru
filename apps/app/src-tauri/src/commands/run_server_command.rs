use std::io::{BufWriter, Write};

use crate::data::servers::SERVER_LIST;

#[tauri::command]
pub async fn run_server_command(server_path: String, command: String) -> Result<(), String> {
    let server_list = SERVER_LIST.lock().await;

    let server = server_list
        .iter()
        .find(|server| server.server_path == server_path);

    println!("Running command: {}", command);

    match server {
        Some(server) => {
            let mut child = server.child.lock().await;

            if let Some(ref mut child_process) = *child {
                if let Some(stdin) = &mut child_process.stdin() {
                    let mut writer = BufWriter::new(stdin);
                    let command_with_newline = format!("{}\n", command); // Append newline
                    let result = writer.write_all(command_with_newline.as_bytes());
                    if let Err(e) = result {
                        return Err(e.to_string());
                    }
                    let flush_result = writer.flush(); // Explicitly flush
                    if let Err(e) = flush_result {
                        return Err(e.to_string());
                    }
                    return Ok(());
                }
            }
            Err("Failed to access child process stdin".to_string())
        }
        None => Err("Server not found".to_string()),
    }
}
