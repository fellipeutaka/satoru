import { Toaster } from "./ui/sonner";

export function Providers(props: React.PropsWithChildren) {
  return (
    <>
      {props.children}
      <Toaster />
    </>
  );
}
