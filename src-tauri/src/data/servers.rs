use command_group::GroupChild;
use once_cell::sync::Lazy;
use std::sync::Mutex;

pub struct Server {
    pub server_path: String,
    pub child: Mutex<Option<GroupChild>>,
}

pub static SERVER_LIST: Lazy<Mutex<Vec<Server>>> = Lazy::new(|| Mutex::new(Vec::new()));
