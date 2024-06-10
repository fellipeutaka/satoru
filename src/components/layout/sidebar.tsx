import { Link, useLocation } from "@tanstack/react-router";
import packageJson from "../../../package.json";
import { ButtonStyles } from "../ui/button";
import { type IconComponent, Icons } from "../ui/icons";

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
    <aside className="border-r flex flex-col justify-between">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={ButtonStyles({
              variant: "ghost",
              className: [
                "justify-start",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50 text-accent-foreground",
              ],
            })}
          >
            <item.icon className="size-4 mr-2" />
            <span className="select-none">{item.title}</span>
          </Link>
        ))}
      </nav>
      <a
        href={packageJson.repository.url}
        target="_blank"
        rel="noopener noreferrer"
        className={ButtonStyles({
          className: "w-full",
          variant: "outline",
        })}
      >
        <Icons.GitHub className="size-4 mr-2" />
        GitHub
      </a>
    </aside>
  );
}
