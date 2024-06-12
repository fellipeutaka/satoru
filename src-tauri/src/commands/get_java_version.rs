use std::process::Command;

#[tauri::command]
pub fn get_java_version() -> Result<String, String> {
    let output = Command::new("cmd")
        .args(["/C", "javac --version"])
        .output();

    if let Ok(output) = output {
        if output.status.success() {
            return Ok(String::from_utf8_lossy(&output.stdout).to_string());
        }
    }

    let install_output = Command::new("cmd")
        .args(["/C", "winget install -e --id Oracle.JDK.17"])
        .output();

    match install_output {
        Ok(output) => {
            if output.status.success() {
                let verify_output = Command::new("cmd")
                    .args(["/C", "javac -version"])
                    .output();

                if let Ok(output) = verify_output {
                    if output.status.success() {
                        return Ok(String::from_utf8_lossy(&output.stdout).to_string());
                    }
                }
                return Err(String::from_utf8_lossy(&output.stderr).to_string());
            } else {
                return Err(String::from_utf8_lossy(&output.stderr).to_string());
            }
        },
        Err(error) => return Err(error.to_string()),
    }
}