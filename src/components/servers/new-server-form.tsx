import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createServer } from "~/lib/tauri/commands";
import { getSettings } from "~/utils/get-settings";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Form } from "../ui/form";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { NewServerFormVersionField } from "./new-server-form-version-field";

const newServerFormSchema = z.object({
  name: z.string().trim().min(1, "Server name is required."),
  description: z.string().trim().min(1, "Server description is required."),
  version: z.string().trim().min(1, "Server version is required."),
});

export type NewServerFormValues = z.infer<typeof newServerFormSchema>;

export function NewServerForm() {
  const form = useForm<NewServerFormValues>({
    resolver: zodResolver(newServerFormSchema),
    defaultValues: {
      name: "",
      description: "",
      version: "",
    },
  });
  const router = useRouter();

  const handleSubmit = form.handleSubmit(async (values) => {
    const loading = toast.loading("Creating server...");

    try {
      const { serverFolder } = await getSettings();

      await createServer({
        name: values.name,
        description: values.description,
        version: values.version,
        server_dir: serverFolder,
      });

      toast.success("Server created successfully!", {
        id: loading,
      });

      router.navigate({
        to: "/servers/$name",
        params: {
          name: values.name,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create server.", {
        id: loading,
      });
    }
  });

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

        <NewServerFormVersionField />

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icons.Loader className="animate-spin size-4 mr-2" />
            )}
            Create Server
          </Button>
        </Dialog.Footer>
      </form>
    </Form>
  );
}
