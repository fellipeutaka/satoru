import { type Event, listen } from "@tauri-apps/api/event";

interface ServerLogs {
  message: string;
}

export async function listenToServerLogs(
  callback: (event: Event<ServerLogs>) => void,
) {
  const promise = await listen<ServerLogs>("server-logs", callback);

  return promise;
}
