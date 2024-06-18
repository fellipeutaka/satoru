use ngrok::{config::ForwarderBuilder, forwarder::Forwarder, tunnel::TcpTunnel};
use tauri::Url;

pub async fn run_ngrok(ngrok_token: String, port: u16) -> Forwarder<TcpTunnel> {
    let session = ngrok::Session::builder()
        .authtoken(ngrok_token)
        .connect()
        .await
        .unwrap();

    let tunnel = session
        .tcp_endpoint()
        .listen_and_forward(Url::parse(&format!("tcp://localhost:{}", port)).unwrap())
        .await
        .unwrap();

    return tunnel;
}
