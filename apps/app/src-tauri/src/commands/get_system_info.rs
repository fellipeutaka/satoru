use serde::Serialize;
use sysinfo::{Pid, System};

use crate::data::servers::SERVER_LIST;

#[derive(Serialize)]
pub struct GetSystemInfo {
    cpu_cores: usize,
    cpu_usage: f32,
    memory_total: u64,
    memory_used: u64,
}

#[tauri::command]
pub async fn get_system_info(server_path: String) -> GetSystemInfo {
    let sys = System::new_all();
    let servers = SERVER_LIST.lock().await;

    let server = servers
        .iter()
        .find(|server| server.server_path == server_path);

    if server.is_none() {
        return GetSystemInfo {
            cpu_cores: sys.cpus().len(),
            cpu_usage: 0.0,
            memory_total: sys.total_memory(),
            memory_used: 0,
        };
    }

    if let Some(process) = sys.process(Pid::from(
        server.unwrap().child.lock().await.as_ref().unwrap().id() as usize,
    )) {
        return GetSystemInfo {
            cpu_cores: sys.cpus().len(),
            cpu_usage: process.cpu_usage(),
            memory_total: sys.total_memory(),
            memory_used: process.memory(),
        };
    }

    return GetSystemInfo {
        cpu_cores: sys.cpus().len(),
        cpu_usage: 0.0,
        memory_total: sys.total_memory(),
        memory_used: 0,
    };
}
