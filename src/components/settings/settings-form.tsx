import { zodResolver } from "@hookform/resolvers/zod";
import { dataDir, desktopDir, join } from "@tauri-apps/api/path";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { settingsStore } from "~/store/settings";
import { SettingsFormFolderField } from "./settings-form-folder-field";
import { SettingsNgrokField } from "./settings-ngrok-field";

const settingsFormSchema = z.object({
  minecraftFolder: z.string(),
  serverFolder: z.string(),
  ngrokToken: z.string().trim().min(1),
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
        <SettingsFormFolderField
          name="minecraftFolder"
          label="Minecraft folder"
          placeholder="C:/Users/your-username/AppData/Roaming/.minecraft"
          description="This is the folder where your Minecraft is installed."
        />

        <SettingsFormFolderField
          name="serverFolder"
          label="Server folder"
          placeholder="C:/Users/your-username/Desktop/servers"
          description="This is the folder where your servers are stored."
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
