interface HeaderProps {
  title: string;
  description: string;
}

export function Header(props: HeaderProps) {
  return (
    <header>
      <h1 className="text-lg font-medium">{props.title}</h1>
      <h2 className="text-sm text-muted-foreground">{props.description}</h2>
    </header>
  );
}
