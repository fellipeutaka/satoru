use std::path::Path;

use serde::Deserialize;

#[derive(Deserialize)]
pub struct GetServerProps {
    pub server_dir: String,
    pub name: String,
}

#[tauri::command]
pub fn accept_terms(props: GetServerProps) {
    let server_path = Path::new(&props.server_dir).join(&props.name);

    let eula_path = server_path.join("eula.txt");
    let eula = std::fs::read_to_string(eula_path.clone()).unwrap_or("eula=false".to_string());
    let eula_accepted = eula.contains("eula=true");

    if !eula_accepted {
        let eula = eula.replace("eula=false", "eula=true");
        std::fs::write(eula_path, eula).unwrap();
    }
}