import { queryOptions } from "@tanstack/react-query";
import { getServers } from "~/lib/tauri/commands";
import { getSettings } from "~/utils/get-settings";
import { queryKeys } from "../keys";

export const getServersQuery = queryOptions({
  queryKey: [queryKeys.servers],
  queryFn: async () => {
    const { serverFolder } = await getSettings();
    const servers = await getServers(serverFolder);

    return servers.map((server) => ({
      id: server,
      name: server,
      maxPlayers: 100,
      onlinePlayers: 12,
      version: "1.17.1",
      ip: "mc.example.com",
      status: "online",
      createdAt: new Date(),
    }));
  },
  throwOnError: true,
});
