import { Link } from "@tanstack/react-router";
import { Icons } from "./icons";

export function Sidebar() {
  return (
    <aside className="border-r">
      <nav className="flex flex-col gap-2">
        <Link className="flex items-center gap-2" to="/">
          <Icons.Server className="size-4" />
          Servers
        </Link>
        <Link className="flex items-center gap-2" to="/settings">
          <Icons.Settings className="size-4" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
