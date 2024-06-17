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
      id: server.path,
      name: server.name,
      maxPlayers: 100,
      onlinePlayers: 12,
      version: server.version,
      ip: "mc.example.com",
      isRunning: server.is_running,
      createdAt: new Date(),
    }));
  },
  throwOnError: true,
});
