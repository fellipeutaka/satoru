import { type Event, listen } from "@tauri-apps/api/event";

export interface ServerLog {
  id: number;
  timestamp: string | null;
  thread: string | null;
  message: string;
}

export async function listenToServerLogs(
  callback: (event: Event<ServerLog>) => void
) {
  const promise = await listen<ServerLog>("server-logs", callback);

  return promise;
}
