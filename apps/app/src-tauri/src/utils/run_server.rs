use std::{
    os::windows::process::CommandExt,
    process::{Command, Output},
};

use windows::Win32::System::Threading::CREATE_NO_WINDOW;

pub fn run_server(server_path: String, ram: String) -> Result<Output, std::io::Error> {
    return Command::new("java")
        .current_dir(server_path)
        .args([
            "-Xmx".to_string() + &ram,
            "-Xms".to_string() + &ram,
            "-jar".to_string(),
            "server.jar".to_string(),
            "nogui".to_string(),
        ])
        .creation_flags(CREATE_NO_WINDOW.0)
        .output();
}
