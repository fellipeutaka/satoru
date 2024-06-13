use crate::utils::run_server::run_server;

#[tauri::command]
pub fn run_server_command(server_path: String, ram_amount: String) -> Result<(), String> {
  let output = run_server(server_path, ram_amount);

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