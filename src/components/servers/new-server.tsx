import { Icons } from "../icons";
import { Button } from "../ui/button";

export function NewServer() {
  return (
    <Button
      // onClick={createPost}
      // disabled={isCreatePending}
      className="flex h-full cursor-pointer items-center justify-center bg-card p-6 text-muted-foreground transition-colors hover:bg-secondary/10 dark:border-none dark:bg-secondary/30 dark:hover:bg-secondary/50"
    >
      <div className="flex flex-col items-center gap-4">
        <Icons.Server className="h-10 w-10" />
        <p className="text-sm">New Server</p>
      </div>
    </Button>
  );
}
