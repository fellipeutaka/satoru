use serde::Serialize;
use sysinfo::System;

#[derive(Serialize)]
pub struct GetSystemInfo {
    memory_total: u64,
    memory_used: u64,
    cpu_cores: usize,
}

#[tauri::command]
pub fn get_system_info() -> GetSystemInfo {
    let sys = System::new_all();

    return GetSystemInfo {
        cpu_cores: sys.cpus().len(),
        memory_total: sys.total_memory(),
        memory_used: sys.used_memory(),
    };
}
