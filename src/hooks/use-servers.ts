import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/tanstack-query";
import { getServers } from "~/lib/tauri/commands";
import { getSettings } from "~/utils/get-settings";

export function useServers() {
  return useQuery({
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
  });
}
