import { Link } from "@tanstack/react-router";
import packageJson from "../../../package.json";
import { ButtonStyles } from "../ui/button";
import { type IconComponent, Icons } from "../ui/icons";

const navItems = [
  {
    title: "Servers",
    href: "/servers",
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
  return (
    <aside className="border-r flex flex-col justify-between sticky top-0 h-screen">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={ButtonStyles({
              variant: "ghost",
              className:
                "justify-start [&.active]:bg-accent [&:not(.active)]:hover:bg-accent/50",
            })}
          >
            <item.icon className="size-4 mr-2 shrink-0" />
            {item.title}
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
        <Icons.GitHub className="size-4 mr-2 shrink-0" />
        GitHub
      </a>
    </aside>
  );
}
