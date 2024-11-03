import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStickToBottom } from "use-stick-to-bottom";
import { cx } from "~/lib/cva";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import {
  type ServerLog,
  listenToServerLogs,
} from "~/lib/tauri/events/server-logs";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { ServerLogsCommandForm } from "./server-logs-command-form";

export function ServerLogs() {
  const { name } = useParams({
    from: "/servers/$name",
  });
  const { data } = useSuspenseQuery(getServerQuery(name));
  const [logs, setLogs] = useState<ServerLog[]>([]);
  const { contentRef, scrollRef, scrollToBottom, isAtBottom } =
    useStickToBottom();

  useEffect(() => {
    const listener = listenToServerLogs((event) => {
      setLogs((prev) => [
        ...prev,
        {
          id: event.payload.id,
          timestamp: event.payload.timestamp,
          thread: event.payload.thread,
          message: event.payload.message,
        },
      ]);
    });

    return () => {
      listener.then((remove) => remove());
    };
  }, []);

  return (
    <div className="relative mt-6">
      {data.is_running ? (
        <>
          <div
            ref={scrollRef}
            className="h-[calc(100vh-20rem)] overflow-y-auto rounded-md border font-mono text-sm *:leading-7"
          >
            <div className="space-y-4 p-4" ref={contentRef}>
              {logs?.map((log) => (
                <div className="whitespace-pre-wrap break-all" key={log.id}>
                  {log.timestamp && (
                    <span className="text-zinc-500">[{log.timestamp}] </span>
                  )}
                  {log.thread && (
                    <span className="text-zinc-400">[{log.thread}] </span>
                  )}
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="-translate-x-1/2 absolute bottom-16 left-1/2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => scrollToBottom()}
              className={cx(
                isAtBottom ? "pointer-events-none opacity-0" : "opacity-100"
              )}
            >
              👇
            </Button>
          </div>
          <ServerLogsCommandForm />
        </>
      ) : (
        <Alert variant="warning">
          <Icons.TriangleAlert className="size-4" />
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>
            The server is not running. Start the server to view logs.
          </Alert.Description>
        </Alert>
      )}
    </div>
  );
}
