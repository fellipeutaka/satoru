import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { listenToServerLogs } from "~/lib/tauri/events";
import { Alert } from "../ui/alert";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";

export function ServerLogs() {
  const { name } = useParams({
    from: "/servers/$name",
  });
  const { data } = useSuspenseQuery(getServerQuery(name));
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const promise = listenToServerLogs((event) => {
      setLines((prev) => [...prev, event.payload.message]);
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => {
      promise.then((remove) => remove());
    };
  }, []);

  return (
    <section className="my-6">
      {data.is_running ? (
        <>
          <div
            ref={containerRef}
            className="h-72 w-full overflow-y-auto rounded-md border"
          >
            <div className="space-y-4 p-4 text-sm *:leading-7">
              {lines?.map((line, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey:
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
          <Input className="mt-4" placeholder="Enter a command..." />
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
    </section>
  );
}
