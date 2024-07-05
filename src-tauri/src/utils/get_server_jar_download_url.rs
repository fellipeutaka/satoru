use scraper::{Html, Selector};

pub async fn get_server_jar_download_url(download_page_url: String) -> String {
    let response = reqwest::get(download_page_url).await;
    let html_content = response.unwrap().text().await.unwrap();
    let document = Html::parse_document(&html_content);

    let html_link_selector = Selector::parse("div.well h2 a").unwrap();
    let server_jar_url = document
        .select(&html_link_selector)
        .next()
        .and_then(|a| a.value().attr("href"))
        .map(str::to_owned)
        .unwrap();

    return server_jar_url;
}
