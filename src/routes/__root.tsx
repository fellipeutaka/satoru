import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "~/components/sidebar";

export const Route = createRootRoute({
  component: () => (
    <div className="grid grid-cols-[auto,1fr] h-screen *:p-4">
      <Sidebar />
      <Outlet />
    </div>
  ),
});
