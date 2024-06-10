import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { useMinecraftVersions } from "../hooks/use-minecraft-versions";
import { Button } from "../ui/button";
import { Command } from "../ui/command";
import { Dialog } from "../ui/dialog";
import { Form } from "../ui/form";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Popover } from "../ui/popover";

const newServerFormSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  version: z.string().trim().min(1),
});

type NewServerFormValues = z.infer<typeof newServerFormSchema>;

export function NewServerForm() {
  const form = useForm<NewServerFormValues>({
    resolver: zodResolver(newServerFormSchema),
  });
  const [isVersionOpen, setIsVersionOpen] = useState(false);

  const handleSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  const { data: versions, isLoading, isError } = useMinecraftVersions();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Form.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Name</Form.Label>
              <Form.Control>
                <Input placeholder="Server Name" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Description</Form.Label>
              <Form.Control>
                <Input placeholder="Server Description" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="version"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Version</Form.Label>
              <Popover open={isVersionOpen} onOpenChange={setIsVersionOpen}>
                <Popover.Trigger asChild>
                  <Form.Control>
                    <Button
                      className={cn(
                        "flex w-full justify-between font-normal group",
                        !field.value && "text-muted-foreground",
                      )}
                      variant="outline"
                      role="combobox"
                    >
                      {field.value
                        ? versions?.find(
                            (version) => version.id === field.value,
                          )?.id
                        : "Select version"}
                      <Icons.ChevronDown className="ml-2 size-4 shrink-0 opacity-50 transition-transform duration-200 group-aria-expanded:rotate-180" />
                    </Button>
                  </Form.Control>
                </Popover.Trigger>
                <Popover.Content className="w-[--radix-popper-anchor-width] p-0">
                  <Command>
                    <Command.Input
                      placeholder="Search version..."
                      className="h-9"
                    />
                    <Command.Empty>Version not found.</Command.Empty>
                    <Command.Group>
                      <Command.List>
                        {versions?.map((version) => (
                          <Command.Item
                            value={version.id}
                            key={version.id}
                            onSelect={() => {
                              form.setValue("version", version.id);
                              setIsVersionOpen(false);
                            }}
                          >
                            {version.id}
                            <Icons.Check
                              className={cn(
                                "ml-auto size-4",
                                version.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </Command.Item>
                        ))}
                      </Command.List>
                    </Command.Group>
                  </Command>
                </Popover.Content>
              </Popover>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button type="submit">Create Server</Button>
        </Dialog.Footer>
      </form>
    </Form>
  );
}
