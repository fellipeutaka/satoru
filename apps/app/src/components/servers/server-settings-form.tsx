import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DIFFICULTY } from "~/constants/difficulty";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { getSystemInfoQuery } from "~/lib/tanstack-query/queries/get-system-info";
import { saveServerSettings } from "~/lib/tauri/commands/save-server-settings";
import { getServerPath } from "~/utils/get-server-path";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";

const MAX_PLAYERS_LIMIT = 2 ** 31 - 1;

export function createSchema(memoryTotal: number) {
  return z.object({
    ram: z.number().int().min(1).max(memoryTotal),
    description: z.string(),
    port: z.coerce
      .number({
        invalid_type_error: "Port must be a number",
      })
      .int()
      .min(1)
      .max(65535),
    maxPlayers: z.coerce
      .number({
        invalid_type_error: "Max players must be a number",
      })
      .int()
      .min(1)
      .max(MAX_PLAYERS_LIMIT),
    onlineMode: z.boolean(),
    difficulty: z.enum(DIFFICULTY),
    hardcore: z.boolean(),
    allowNether: z.boolean(),
    pvp: z.boolean(),
  });
}

type ServerSettings = z.infer<ReturnType<typeof createSchema>>;

export function ServerSettingsForm() {
  const { name } = useParams({
    from: "/servers/$name",
  });

  const { data: systemInfo } = useSuspenseQuery(getSystemInfoQuery(name));
  const { data: server } = useSuspenseQuery(getServerQuery(name));

  const form = useForm<ServerSettings>({
    resolver: zodResolver(createSchema(systemInfo.memoryTotal)),
    defaultValues: {
      ram: server.ram / 1024,
      description: server.description,
      port: server.server_properties.server_port,
      maxPlayers: server.server_properties.max_players,
      onlineMode: server.server_properties.online_mode,
      difficulty: server.server_properties.difficulty,
      hardcore: server.server_properties.hardcore,
      allowNether: server.server_properties.allow_nether,
      pvp: server.server_properties.pvp,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const server_path = await getServerPath(name);

    toast.promise(
      saveServerSettings({
        server_path,
        ram_in_gb: data.ram,
        description: data.description,
        port: data.port,
        max_players: data.maxPlayers,
        online_mode: data.onlineMode,
        difficulty: data.difficulty,
        hardcore: data.hardcore,
        allow_nether: data.allowNether,
        pvp: data.pvp,
      }),
      {
        loading: "Updating server settings...",
        success: () => {
          form.reset(data, { keepDirty: false });
          return "Server settings updated";
        },
        error: "Failed to update server settings",
      },
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="my-6 space-y-8">
        <Alert variant="warning">
          <Icons.TriangleAlert className="size-4" />
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>
            If the server is running, you may need to restart it for the changes
            to take effect.
          </Alert.Description>
        </Alert>

        <Form.Field
          control={form.control}
          name="ram"
          render={({ field: { value, onChange } }) => (
            <Form.Item>
              <Form.Label>Memory (GB)</Form.Label>
              <Form.Control>
                <Slider
                  min={1}
                  max={systemInfo.memoryTotal}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={([value]) => onChange(value)}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Tooltip.Provider delayDuration={300}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Slider.Thumb />
                      </Tooltip.Trigger>
                      <Tooltip.Content>{value} GB</Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </Slider>
              </Form.Control>
              <Form.Description>
                The amount of memory the server can use.
              </Form.Description>
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
              <Form.Description>A description of the server.</Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="port"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Port</Form.Label>
              <Form.Control>
                <Input placeholder="25565" {...field} />
              </Form.Control>
              <Form.Description>
                The port the server will run on.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="maxPlayers"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Max Players</Form.Label>
              <Form.Control>
                <Input placeholder="50" {...field} />
              </Form.Control>
              <Form.Description>
                The maximum number of players that can join the server.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Difficulty</Form.Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <Form.Control>
                  <Select.Trigger className="capitalize">
                    <Select.Value
                      placeholder={
                        <span className="text-muted-foreground">
                          Select a difficulty
                        </span>
                      }
                    />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  {DIFFICULTY.map((difficulty) => (
                    <Select.Item
                      className="capitalize"
                      key={difficulty}
                      value={difficulty}
                    >
                      {difficulty}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
              <Form.Description>The difficulty of the server.</Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="onlineMode"
          render={({ field }) => (
            <Form.Item>
              <div className="flex items-center gap-2">
                <Form.Control>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    <Switch.Thumb />
                  </Switch>
                </Form.Control>
                <Form.Label>Online mode</Form.Label>
              </div>
              <Form.Description>
                Enable or disable online mode. When enabled, players must have a
                valid Minecraft account to join.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="hardcore"
          render={({ field }) => (
            <Form.Item>
              <div className="flex items-center gap-2">
                <Form.Control>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    <Switch.Thumb />
                  </Switch>
                </Form.Control>
                <Form.Label>Hardcore</Form.Label>
              </div>
              <Form.Description>
                When enabled, the server will be in hardcore mode.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="allowNether"
          render={({ field }) => (
            <Form.Item>
              <div className="flex items-center gap-2">
                <Form.Control>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    <Switch.Thumb />
                  </Switch>
                </Form.Control>
                <Form.Label>Allow Nether</Form.Label>
              </div>
              <Form.Description>
                Enable or disable the Nether dimension.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="pvp"
          render={({ field }) => (
            <Form.Item>
              <div className="flex items-center gap-2">
                <Form.Control>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    <Switch.Thumb />
                  </Switch>
                </Form.Control>
                <Form.Label>PvP</Form.Label>
              </div>
              <Form.Description>
                Enable or disable player vs player combat.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting && (
            <Icons.Loader className="mr-2 size-4 animate-spin" />
          )}
          Update settings
        </Button>
      </form>
    </Form>
  );
}
