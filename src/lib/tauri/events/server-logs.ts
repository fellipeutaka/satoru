import { type Event, listen } from "@tauri-apps/api/event";

export async function listenToServerLogs(
  callback: (event: Event<string>) => void,
) {
  const promise = await listen<string>("server-logs", callback);

  return promise;
}
