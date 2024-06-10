import { createLazyFileRoute } from "@tanstack/react-router";
import { SettingsForm } from "~/components/settings/settings-form";
import { Separator } from "~/components/ui/separator";

export const Route = createLazyFileRoute("/settings")({
  component: () => (
    <main className="space-y-6">
      <header>
        <h1 className="text-lg font-medium">Settings</h1>
        <h2 className="text-sm text-muted-foreground">
          This is the settings page. You can add settings here for your
          application.
        </h2>
      </header>
      <Separator />
      <SettingsForm />
    </main>
  ),
});
