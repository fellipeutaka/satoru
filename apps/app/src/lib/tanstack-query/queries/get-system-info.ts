import { queryOptions } from "@tanstack/react-query";
import { getSystemInfo } from "~/lib/tauri/commands/get-system-info";
import { getServerPath } from "~/utils/get-server-path";
import { queryKeys } from "../keys";

const bytesToGigaBytes = (bytes: number) => bytes / 1024 / 1024 / 1024;

export const getSystemInfoQuery = (name: string) =>
  queryOptions({
    queryKey: [queryKeys.system],
    queryFn: async () => {
      const serverPath = await getServerPath(name);
      const systemInfo = await getSystemInfo({ serverPath });

      return {
        cpuUsage: systemInfo.cpu_usage,
        cpuCores: systemInfo.cpu_cores,
        memoryTotal: Math.round(bytesToGigaBytes(systemInfo.memory_total)),
        memoryUsed: Math.round(bytesToGigaBytes(systemInfo.memory_used)),
      };
    },
    throwOnError: true,
  });
