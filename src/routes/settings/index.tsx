import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/layout/header";
import { SettingsForm } from "~/components/settings/settings-form";
import { Separator } from "~/components/ui/separator";

export const Route = createFileRoute("/settings/")({
  component: () => (
    <main className="shell">
      <Header
        title="Settings"
        description="This is the settings page. You can add settings here for your application."
      />
      <Separator />
      <SettingsForm />
    </main>
  ),
});
