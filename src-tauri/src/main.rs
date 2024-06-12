// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
use commands::{get_java_version::get_java_version, get_servers::get_servers, create_server::create_server, download_spigot::download_spigot};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![get_java_version, get_servers, create_server, download_spigot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
