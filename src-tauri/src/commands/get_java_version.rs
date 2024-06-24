use std::process::Command;

#[tauri::command]
pub fn get_java_version() -> Result<String, String> {
    let output = Command::new("javac").arg("--version").output();

    match output {
        Ok(output) => {
            if output.status.success() {
                return Ok(String::from_utf8_lossy(&output.stdout).to_string());
            } else {
                return Err(String::from_utf8_lossy(&output.stderr).to_string());
            }
        }
        Err(error) => return Err(error.to_string()),
    }
}
