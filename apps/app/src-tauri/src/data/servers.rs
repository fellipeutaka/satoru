use std::time::Instant;

use ngrok::{forwarder::Forwarder, tunnel::TcpTunnel};
use once_cell::sync::Lazy;
use process_wrap::std::StdChildWrapper;
use tokio::sync::Mutex;

pub struct Server {
    pub server_path: String,
    pub child: Mutex<Option<Box<dyn StdChildWrapper>>>,
    pub tcp_tunnel: Mutex<Forwarder<TcpTunnel>>,
    pub start_time: Instant,
    pub player_count: std::sync::Mutex<u32>,
}

pub static SERVER_LIST: Lazy<Mutex<Vec<Server>>> = Lazy::new(|| Mutex::new(Vec::new()));
