import { Icons } from "../ui/icons";
import { NewServerDialog } from "./new-server-dialog";

export function ServerListEmpty() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1">
      <Icons.Server />
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">
          You don't have any servers yet
        </h2>
        <p>Create a new server to start managing your application's servers.</p>
      </div>
      <NewServerDialog />
    </div>
  );
}
