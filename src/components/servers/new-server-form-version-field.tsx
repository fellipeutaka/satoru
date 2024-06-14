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
  const {
    data: versions,
    isLoading,
    isError,
  } = useQuery(getMinecraftVersionsQuery);
  const [isVersionOpen, setIsVersionOpen] = useState(false);
  const form = useFormContext<NewServerFormValues>();

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
                    "flex w-full justify-between font-normal group",
                    !field.value && "text-muted-foreground",
                  )}
                  variant="outline"
                  role="combobox"
                >
                  {field.value
                    ? versions?.find((version) => version.id === field.value)
                        ?.id
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
                    <div className="flex justify-center items-center gap-2">
                      <Icons.Loader className="animate-spin size-4" />
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
                    {versions?.map((version) => (
                      <Command.Item
                        value={version.id}
                        key={version.id}
                        onSelect={() => {
                          form.setValue("version", version.id, {
                            shouldValidate: true,
                          });
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
  );
}
