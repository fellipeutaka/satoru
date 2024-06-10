import { zodResolver } from "@hookform/resolvers/zod";
import { open } from "@tauri-apps/api/dialog";
import { dataDir, desktopDir, join } from "@tauri-apps/api/path";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { InputStyles } from "~/components/ui/input";
import { settingsStore } from "~/store/settings";
import { SettingsNgrokField } from "./settings-ngrok-field";

const settingsFormSchema = z.object({
  minecraftFolder: z.string(),
  serverFolder: z.string(),
  ngrokToken: z.string().optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function SettingsForm() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: async () => {
      const data = settingsFormSchema.safeParse(
        await settingsStore.get("settings"),
      );
      if (data.success) {
        return data.data;
      }

      const [dataDirPath, desktopPath] = await Promise.all([
        dataDir(),
        desktopDir(),
      ]);

      const [minecraftFolder, serverFolder] = await Promise.all([
        join(dataDirPath, ".minecraft"),
        join(desktopPath, "servers"),
      ]);

      return {
        minecraftFolder,
        serverFolder,
        ngrokToken: "",
      };
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await settingsStore.set("settings", data);
    form.reset(data, { keepValues: true });
    toast.success("Settings updated successfully!");
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Form.Field
          control={form.control}
          name="minecraftFolder"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Minecraft folder</Form.Label>
              <Form.Control>
                <button
                  type="button"
                  className={InputStyles({
                    className: "items-center",
                  })}
                  onClick={async () => {
                    const path = await open({
                      directory: true,
                      defaultPath: field.value,
                    });
                    if (path) {
                      field.onChange(path);
                    }
                  }}
                  {...field}
                >
                  {field.value ||
                    "C:/Users/your-username/AppData/Roaming/.minecraft"}
                </button>
              </Form.Control>
              <Form.Description>
                This is the folder where your Minecraft is installed.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="serverFolder"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Server folder</Form.Label>
              <Form.Control>
                <button
                  type="button"
                  className={InputStyles({
                    className: "items-center",
                  })}
                  onClick={async () => {
                    const path = await open({
                      directory: true,
                      defaultPath: field.value,
                    });
                    if (path) {
                      field.onChange(path);
                    }
                  }}
                  {...field}
                >
                  {field.value || "C:/Users/your-username/Desktop/servers"}
                </button>
              </Form.Control>
              <Form.Description>
                This is the folder where your servers are stored.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <SettingsNgrokField />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          Update settings
        </Button>
      </form>
    </Form>
  );
}
