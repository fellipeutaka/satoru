use std::io::{BufRead, BufReader};

use crate::data::servers::SERVER_LIST;
use tauri::Manager;

#[tauri::command]
pub fn get_server_logs(app: tauri::AppHandle, server_path: String) {
    println!("Get Server Logs");

    let server_list = SERVER_LIST.lock().unwrap();

    let server = server_list
        .iter()
        .find(|server| server.server_path == server_path);
    let mut binding = server.clone().unwrap().child.lock().unwrap();
    let child = binding.as_mut().unwrap();
    println!("Child process id in get_server_logs: {:?}", child.id());
    let stdout = child.inner().stdout.take();

    if let Some(stdout) = stdout {
        let reader = BufReader::new(stdout);

        for line in reader.lines() {
            match line {
                Ok(line) => {
                    #[derive(Clone, serde::Serialize)]
                    struct ServerLogPayload {
                        message: String,
                    }

                    app.emit_all("server-logs", ServerLogPayload { message: line })
                        .unwrap();
                }
                Err(e) => {
                    println!("Error: {}", e);
                }
            }
        }
    }
}
