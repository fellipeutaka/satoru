import { open } from "@tauri-apps/api/dialog";
import { useFormContext } from "react-hook-form";
import type { Settings } from "~/store/settings";
import { Form } from "../ui/form";
import { InputStyles } from "../ui/input";

interface SettingsFormFolderFieldProps {
  name: keyof Settings;
  label: string;
  description: string;
}

export function SettingsFormFolderField({
  name,
  label,
  description,
}: SettingsFormFolderFieldProps) {
  const form = useFormContext<Settings>();

  return (
    <Form.Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <Form.Item>
          <Form.Label>{label}</Form.Label>
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
              {field.value}
            </button>
          </Form.Control>
          <Form.Description>{description}</Form.Description>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}
