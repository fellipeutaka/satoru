use std::process::{Command, Output};

#[tauri::command]
pub fn run_server(server_path: String) -> Result<Output, std::io::Error> {
  return Command::new("java")
        .current_dir(server_path)
        .args(["-Xmx1024M", "-Xms1024M", "-jar", "server.jar", "nogui"])
        .output();
}