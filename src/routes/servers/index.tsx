import {
  type ErrorComponentProps,
  createFileRoute,
  useRouter,
} from "@tanstack/react-router";
import { Header } from "~/components/layout/header";
import { ServerList } from "~/components/servers/server-list";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { queryClient } from "~/lib/tanstack-query/client";
import { getServersQuery } from "~/lib/tanstack-query/queries/get-servers";

export const Route = createFileRoute("/servers/")({
  component: Component,
  loader: () => queryClient.ensureQueryData(getServersQuery),
  errorComponent: ErrorComponent,
});

function Component() {
  return (
    <main className="shell">
      <Header
        title="Servers"
        description="This is the servers page. You can add servers here for your application."
      />
      <Separator />
      <ServerList />
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <main className="shell justify-center items-center">
      <h1 className="font-medium text-2xl">Something went wrong!</h1>
      <p className="max-w-sm whitespace-pre-line text-pretty text-sm">
        {error.message}
      </p>
      <Button
        onClick={() => {
          reset();
          router.invalidate();
        }}
      >
        Try again
      </Button>
    </main>
  );
}
