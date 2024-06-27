import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "~/components/layout/sidebar";

export const Route = createRootRoute({
  component: Component,
});

function Component() {
  return (
    <div className="grid grid-cols-[1fr,6fr] *:p-4 xl:grid-cols-[1fr,9fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
}
