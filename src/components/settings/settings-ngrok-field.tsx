import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Form } from "../ui/form";
import { Icons } from "../ui/icons";
import { InputStyles } from "../ui/input";
import type { SettingsFormValues } from "./settings-form";

export function SettingsNgrokField() {
  const form = useFormContext<SettingsFormValues>();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Form.Field
      control={form.control}
      name="ngrokToken"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>Ngrok token</Form.Label>
          <div className={InputStyles({ className: "gap-2 pl-0" })}>
            <Form.Control>
              <input
                className="flex-1 bg-transparent outline-none pl-3"
                type={isVisible ? "text" : "password"}
                placeholder="Ngrok token"
                {...field}
              />
            </Form.Control>
            <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
              <Icons.EyeOff
                data-visible={isVisible}
                className="absolute size-4 scale-100 transition-transform data-[visible='true']:scale-0"
              />
              <Icons.Eye
                data-visible={isVisible}
                className="size-4 transition-transform data-[visible='false']:scale-0"
              />
            </button>
          </div>
          <Form.Description>
            This is the token used to authenticate with Ngrok. You can get one
            from{" "}
            <a
              href="https://dashboard.ngrok.com/get-started/your-authtoken"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              here
            </a>
            .
          </Form.Description>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}
