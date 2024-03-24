use std::fs;
use std::io;
use std::time::SystemTime;

pub fn modified_time_of(file_path: String) -> Result<SystemTime, io::Error> {
    let meta = fs::metadata(file_path)?;
    meta.modified()
}
