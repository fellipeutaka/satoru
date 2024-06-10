import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextMenu } from "./ui/context-menu";
import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

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
