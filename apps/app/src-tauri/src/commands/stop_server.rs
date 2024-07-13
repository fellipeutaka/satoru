use ngrok::tunnel::TunnelCloser;

use crate::data::servers::SERVER_LIST;

#[tauri::command]
pub async fn stop_server(server_path: String) {
    let mut server_list = SERVER_LIST.lock().await;

    let server = server_list
        .iter()
        .find(|server| server.server_path == server_path);

    if let Some(server) = server {
        server
            .tcp_tunnel
            .lock()
            .await
            .close()
            .await
            .expect("couldn't close tunnel");

        let child = server.child.lock().await.take();

        if let Some(mut child) = child {
            child.kill().expect("command couldn't be killed");
        }

        server_list.retain(|server| server.server_path != server_path);
    }
}
