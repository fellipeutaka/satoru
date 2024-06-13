// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod utils;
use commands::{
    accept_terms::accept_terms,
    create_server::create_server,
    download_spigot::download_spigot,
    get_java_version::get_java_version,
    get_server::get_server,
    get_servers::get_servers,
    open_folder::open_folder,
    run_server_command::run_server_command
};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![accept_terms, create_server, download_spigot, get_java_version, get_server, get_servers, open_folder, run_server_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
