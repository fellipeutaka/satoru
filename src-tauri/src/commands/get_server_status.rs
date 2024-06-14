use crate::data::servers::SERVER_LIST;

#[tauri::command]
pub fn get_server_status(server_path: String) -> bool {
    println!("Get Server Status");

    let server_list = SERVER_LIST.lock().unwrap();

    let server = server_list
        .iter()
        .find(|server| server.server_path == server_path);

    if let Some(server) = server {
        return server.child.lock().unwrap().as_ref().is_some();
    } else {
        return false;
    }
}
