import { Icons } from "../ui/icons";
import { NewServerDialog } from "./new-server-dialog";

export function ServerListEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <Icons.Server />
      <div className="space-y-2 text-center">
        <h2 className="font-semibold text-lg">
          You don't have any servers yet
        </h2>
        <p>Create a new server to start managing your application's servers.</p>
      </div>
      <NewServerDialog />
    </div>
  );
}
