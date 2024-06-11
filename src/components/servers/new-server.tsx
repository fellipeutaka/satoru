import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Icons } from "../ui/icons";
import { NewServerForm } from "./new-server-form";

export function NewServer() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="secondary" className="size-full p-6">
          <div className="flex flex-col items-center gap-4">
            <Icons.Plus className="size-10" />
            <p className="text-sm">New Server</p>
          </div>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>New Server</Dialog.Title>
          <Dialog.Description>
            Create a new server for your application.
          </Dialog.Description>
        </Dialog.Header>
        <NewServerForm />
      </Dialog.Content>
    </Dialog>
  );
}
