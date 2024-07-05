import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getMinecraftVersionsQuery } from "~/lib/tanstack-query/queries/get-minecraft-versions";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Command } from "../ui/command";
import { Form } from "../ui/form";
import { Icons } from "../ui/icons";
import { Popover } from "../ui/popover";
import type { NewServerFormValues } from "./new-server-form";

export function NewServerFormVersionField() {
  const form = useFormContext<NewServerFormValues>();
  const {
    data: versions,
    isLoading,
    isError,
  } = useQuery(getMinecraftVersionsQuery(form.getValues("software")));
  const [isVersionOpen, setIsVersionOpen] = useState(false);

  return (
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
                    "group flex w-full justify-between font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  variant="outline"
                  role="combobox"
                >
                  {field.value
                    ? versions?.find(({ version }) => version === field.value)
                        ?.version
                    : "Select version"}
                  <Icons.ChevronDown className="ml-2 size-4 opacity-50 transition-transform duration-200 group-aria-expanded:rotate-180" />
                </Button>
              </Form.Control>
            </Popover.Trigger>
            <Popover.Content
              avoidCollisions={false}
              side="bottom"
              className="w-[--radix-popper-anchor-width] p-0"
            >
              <Command>
                <Command.Input
                  placeholder="Search version..."
                  className="h-9"
                  disabled={isLoading}
                />
                <Command.Empty>
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Icons.Loader className="size-4 animate-spin" />
                      Fetching versions...
                    </div>
                  ) : isError ? (
                    "Failed to fetch versions."
                  ) : (
                    "Version not found."
                  )}
                </Command.Empty>
                <Command.Group>
                  <Command.List>
                    {versions?.map(({ version, download_url }) => (
                      <Command.Item
                        key={version}
                        value={version}
                        onSelect={() => {
                          form.setValue("version", version, {
                            shouldValidate: true,
                          });
                          form.setValue("downloadUrl", download_url, {
                            shouldValidate: true,
                          });
                          setIsVersionOpen(false);
                        }}
                      >
                        {version}
                        <Icons.Check
                          className={cn(
                            "ml-auto size-4",
                            version === field.value
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
  );
}
