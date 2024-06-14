import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { queryClient } from "~/lib/tanstack-query/client";
import { getServerQuery } from "~/lib/tanstack-query/queries/get-server";
import { acceptTerms } from "~/lib/tauri/commands";
import { getSettings } from "~/utils/get-settings";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form } from "../ui/form";
import { Icons } from "../ui/icons";

const eulaFormSchema = z.object({
  accepted: z
    .boolean()
    .refine((value) => value === true, "You must accept the EULA to continue."),
});

type EulaFormValues = z.infer<typeof eulaFormSchema>;

export function EulaForm() {
  const form = useForm<EulaFormValues>({
    resolver: zodResolver(eulaFormSchema),
    defaultValues: {
      accepted: false,
    },
  });

  const { name } = useParams({
    from: "/servers/$name",
  });

  const handleSubmit = form.handleSubmit(() => {
    toast.promise(
      async () => {
        const { serverFolder } = await getSettings();
        await acceptTerms({
          name,
          server_dir: serverFolder,
        });

        await queryClient.invalidateQueries({
          queryKey: getServerQuery(name).queryKey,
        });
      },
      {
        loading: "Accepting terms...",
        success: "Terms accepted successfully!",
        error: "Failed to accept terms.",
      },
    );
  });

  return (
    <Form {...form}>
      <form className="space-y-6 my-6" onSubmit={handleSubmit}>
        <Form.Field
          control={form.control}
          name="accepted"
          render={({ field }) => (
            <div className="flex flex-col">
              <Form.Item className="flex items-center gap-2 space-y-0">
                <Form.Control>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    <Checkbox.Indicator>
                      <Checkbox.Icon />
                    </Checkbox.Indicator>
                  </Checkbox>
                </Form.Control>

                <Form.Label>
                  I have read and agreed to the Terms and Conditions
                </Form.Label>
              </Form.Item>
              <Form.Message />
            </div>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Icons.Loader className="animate-spin size-4 mr-2" />
          )}
          Continue
        </Button>
      </form>
    </Form>
  );
}
