// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::time::SystemTime;

mod tools;

#[tauri::command]
fn get_modified_time(file_path: String) -> Result<SystemTime, String> {
    tools::modified_time_of(file_path).map_err(|err| err.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_modified_time])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
