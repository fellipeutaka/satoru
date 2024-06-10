import { NewServer } from "./new-server";

export function ServerList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NewServer />
    </div>
  );
}
