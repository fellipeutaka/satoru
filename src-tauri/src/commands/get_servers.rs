#[tauri::command]
pub fn get_servers(server_folder: String) -> Result<Vec<String>, String> {
    let files = std::fs::read_dir(server_folder);

    match files {
        Ok(files) => {
            let mut servers = Vec::new();
            for file in files {
                let file = file.unwrap();
                let file_name = file.file_name().into_string().unwrap();
                servers.push(file_name);
            }
            Ok(servers)
        },
        Err(error) => {
            Err(error.to_string())
        }
    }
}