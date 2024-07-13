import { Alert } from "../ui/alert";
import { Icons } from "../ui/icons";

export function ServerPlugins() {
  return (
    <section className="my-6">
      <Alert>
        <Icons.Rocket className="size-4" />
        <Alert.Title>Coming Soon</Alert.Title>
        <Alert.Description>
          This feature is coming soon. Stay tuned!
        </Alert.Description>
      </Alert>
    </section>
  );
}
