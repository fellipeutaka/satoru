use ngrok::{config::ForwarderBuilder, forwarder::Forwarder, tunnel::TcpTunnel};
use tauri::Url;

use super::create_ngrok_session::get_ngrok_session;

pub async fn run_ngrok(ngrok_token: String, port: u16) -> Forwarder<TcpTunnel> {
    let session = get_ngrok_session(ngrok_token).await;

    let tunnel = session
        .tcp_endpoint()
        .listen_and_forward(Url::parse(&format!("tcp://localhost:{}", port)).unwrap())
        .await
        .unwrap();

    return tunnel;
}
