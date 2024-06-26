import { queryOptions } from "@tanstack/react-query";
import { getServers } from "~/lib/tauri/commands/get-servers";
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
      maxPlayers: server.server_properties.max_players,
      onlinePlayers: server.player_count,
      version: server.version,
      ip: server.ip,
      isRunning: server.is_running,
      createdAt: new Date(server.created_at),
    }));
  },
  throwOnError: true,
});
