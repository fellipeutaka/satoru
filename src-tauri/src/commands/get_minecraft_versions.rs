use scraper::{Html, Selector};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Data {
    version: String,
    download_url: String,
}

#[tauri::command]
pub async fn get_minecraft_versions(software: String) -> Vec<Data> {
    let response = reqwest::get(format!("https://getbukkit.org/download/{}", software)).await;
    let html_content = response.unwrap().text().await.unwrap();
    let document = Html::parse_document(&html_content);

    let html_version_selector = Selector::parse("div.download-pane").unwrap();
    let html_versions = document.select(&html_version_selector);

    let mut versions: Vec<Data> = Vec::new();

    for html_version in html_versions {
        let version = html_version
            .select(&Selector::parse("h2").unwrap())
            .next()
            .map(|h2| h2.text().collect::<String>());

        let download_url = html_version
            .select(&Selector::parse("a.btn-download").unwrap())
            .next()
            .and_then(|a| a.value().attr("href"))
            .map(str::to_owned);

        if let Some(version) = version {
            if !versions.iter().any(|v| v.version == version) {
                versions.push(Data {
                    version,
                    download_url: download_url.unwrap(),
                });
            }
        }
    }

    return versions;
}
