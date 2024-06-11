import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "~/components/layout/sidebar";

export const Route = createRootRoute({
  component: Component,
});

function Component() {
  return (
    <div className="grid grid-cols-[10%,1fr] *:p-4">
      <Sidebar />
      <Outlet />
    </div>
  );
}
