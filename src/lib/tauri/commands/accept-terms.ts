import { invoke } from "@tauri-apps/api";

interface AcceptTermsProps {
  server_dir: string;
  name: string;
}

export async function acceptTerms(props: AcceptTermsProps) {
  try {
    await invoke("accept_terms", { props });
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw new Error("Failed to accept terms");
  }
}
