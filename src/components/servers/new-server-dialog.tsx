import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Icons } from "../ui/icons";
import { NewServerForm } from "./new-server-form";

export function NewServerDialog() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">
          <Icons.Plus className="mr-2 size-4" />
          Add a server
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>New Server</Dialog.Title>
          <Dialog.Description>
            Fill in the form below to create a new Minecraft server.
          </Dialog.Description>
        </Dialog.Header>
        <NewServerForm />
      </Dialog.Content>
    </Dialog>
  );
}
