pub async fn create_folder(path: &str) -> Result<(), String> {
    match std::fs::create_dir_all(path) {
        Ok(_) => Ok(()),
        Err(err) => Err(err.to_string()),
    }
}
