import { queryOptions } from "@tanstack/react-query";
import { getMinecraftVersions } from "~/lib/tauri/commands/get-minecraft-versions";
import { queryKeys } from "../keys";

export const getMinecraftVersionsQuery = (software: string) =>
  queryOptions({
    queryKey: [queryKeys.versions, software],
    queryFn: async () => {
      return await getMinecraftVersions(software);
    },
  });
