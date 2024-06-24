import { queryOptions } from "@tanstack/react-query";
import { getServer } from "~/lib/tauri/commands/get-server";
import { getSettings } from "~/utils/get-settings";
import { queryKeys } from "../keys";

export const getServerQuery = (name: string) =>
  queryOptions({
    queryKey: [queryKeys.servers, name],
    queryFn: async () => {
      const { serverFolder } = await getSettings();
      return await getServer({ name, server_dir: serverFolder });
    },
    throwOnError: true,
  });
