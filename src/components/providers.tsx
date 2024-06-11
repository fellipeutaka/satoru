import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/lib/tanstack-query/client";
import { ContextMenu } from "./ui/context-menu";
import { Toaster } from "./ui/sonner";

export function Providers(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextMenu>
        <ContextMenu.Trigger>{props.children}</ContextMenu.Trigger>
      </ContextMenu>
      <Toaster />
    </QueryClientProvider>
  );
}
