interface HeaderProps {
  title: string;
  description: string;
}

export function Header(props: HeaderProps) {
  return (
    <header>
      <h1 className="font-medium text-lg">{props.title}</h1>
      <h2 className="text-muted-foreground text-sm">{props.description}</h2>
    </header>
  );
}
