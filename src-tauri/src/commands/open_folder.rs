#[tauri::command]
pub fn open_folder(path: String) {
    open::that_in_background(path);
}
