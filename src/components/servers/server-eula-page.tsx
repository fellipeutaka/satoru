import { Link } from "@tanstack/react-router";
import { Header } from "../layout/header";
import { ButtonStyles } from "../ui/button";
import { Icons } from "../ui/icons";
import { Separator } from "../ui/separator";
import { Eula } from "./eula";
import { EulaForm } from "./eula-form";

export function ServerEulaPage() {
  return (
    <main className="shell">
      <Header
        title="Server"
        description="This is the server page. You need to accept the EULA to continue."
      />
      <Separator />
      <div>
        <Link to="/servers" className={ButtonStyles({ variant: "outline" })}>
          <Icons.ChevronLeft className="size-4 mr-2" />
          Back to Servers
        </Link>
      </div>
      <div className="container max-w-6xl">
        <Eula />
        <EulaForm />
      </div>
    </main>
  );
}
