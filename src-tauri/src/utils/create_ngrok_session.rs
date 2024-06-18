use ngrok::Session;
use once_cell::sync::Lazy;
use tokio::sync::Mutex;

static NGROK_SESSION: Lazy<Mutex<Option<Session>>> = Lazy::new(|| Mutex::new(None));

pub async fn get_ngrok_session(ngrok_token: String) -> Session {
    let mut session = NGROK_SESSION.lock().await;
    if session.is_none() {
        *session = Some(
            ngrok::Session::builder()
                .authtoken(ngrok_token)
                .connect()
                .await
                .unwrap(),
        );

        return session.as_ref().unwrap().clone();
    }

    return session.as_ref().unwrap().clone();
}
