import { open } from "@tauri-apps/api/dialog";
import { useFormContext } from "react-hook-form";
import { Form } from "../ui/form";
import { InputStyles } from "../ui/input";
import type { SettingsFormValues } from "./settings-form";

interface SettingsFormFolderFieldProps {
  name: keyof SettingsFormValues;
  label: string;
  description: string;
  placeholder: string;
}

export function SettingsFormFolderField({
  name,
  label,
  description,
  placeholder,
}: SettingsFormFolderFieldProps) {
  const form = useFormContext<SettingsFormValues>();

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
              {field.value || placeholder}
            </button>
          </Form.Control>
          <Form.Description>{description}</Form.Description>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}
