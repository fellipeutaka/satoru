use std::process::Command;

use super::get_java_version::get_java_version;

#[tauri::command]
pub fn install_java() -> Result<String, String> {
    #[cfg(target_os = "windows")]
    let install_output = Command::new("cmd")
        .args(["/C", "winget install -e --id Oracle.JDK.22"])
        .output();

    #[cfg(target_os = "linux")]
    let install_output = Command::new("sh")
        .args(["-c", "sudo apt install openjdk-22-jdk"])
        .output();

    #[cfg(target_os = "macos")]
    let install_output = Command::new("sh")
        .args(["-c", "brew install openjdk@22"])
        .output();

    match install_output {
        Ok(output) => {
            if output.status.success() {
                let verify_output = get_java_version();

                match verify_output {
                    Ok(_) => {
                        return Ok(String::from_utf8_lossy(&output.stdout).to_string());
                    }
                    Err(error) => return Err(error.to_string()),
                }
            } else {
                return Err(String::from_utf8_lossy(&output.stderr).to_string());
            }
        }
        Err(error) => return Err(error.to_string()),
    }
}
