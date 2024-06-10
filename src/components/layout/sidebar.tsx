import { Link, useLocation } from "@tanstack/react-router";
import { type IconComponent, Icons } from "../icons";
import { ButtonStyles } from "../ui/button";

const navItems = [
  {
    title: "Servers",
    href: "/",
    icon: Icons.Server,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Icons.Settings,
  },
] satisfies {
  title: string;
  href: string;
  icon: IconComponent;
}[];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="border-r">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={ButtonStyles({
              variant: "ghost",
              className:
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent",
            })}
          >
            <item.icon className="size-4 mr-2" />
            <span className="select-none">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
