// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod data;
mod utils;
use commands::{
    accept_terms::accept_terms, create_server::create_server, delete_server::delete_server,
    download_server_jar::download_server_jar, get_java_version::get_java_version,
    get_minecraft_versions::get_minecraft_versions, get_server::get_server,
    get_servers::get_servers, get_system_info::get_system_info, install_java::install_java,
    open_folder::open_folder, run_server_command::run_server_command,
    save_server_settings::save_server_settings, start_server::start_server,
    stop_server::stop_server,
};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            accept_terms,
            create_server,
            delete_server,
            download_server_jar,
            get_java_version,
            get_minecraft_versions,
            get_server,
            get_servers,
            get_system_info,
            install_java,
            open_folder,
            run_server_command,
            save_server_settings,
            start_server,
            stop_server
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
