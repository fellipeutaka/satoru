import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { type Settings, settingsSchema, settingsStore } from "~/store/settings";
import { getSettings } from "~/utils/get-settings";
import { Icons } from "../ui/icons";
import { SettingsFormFolderField } from "./settings-form-folder-field";
import { SettingsNgrokField } from "./settings-ngrok-field";

export function SettingsForm() {
  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: getSettings,
  });

  const handleSubmit = form.handleSubmit((data) => {
    toast.promise(settingsStore.set("settings", data), {
      loading: "Updating settings...",
      success: "Settings updated successfully!",
      error: "Failed to update settings.",
    });
    form.reset(data, { keepValues: true });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <SettingsFormFolderField
          name="minecraftFolder"
          label="Minecraft folder"
          description="This is the folder where your Minecraft is installed."
        />

        <SettingsFormFolderField
          name="serverFolder"
          label="Server folder"
          description="This is the folder where your servers are stored."
        />

        <SettingsNgrokField />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting && (
            <Icons.Loader className="animate-spin size-4 mr-2" />
          )}
          Update settings
        </Button>
      </form>
    </Form>
  );
}
