import { queryOptions } from "@tanstack/react-query";
import { getSystemInfo } from "~/lib/tauri/commands/get-system-info";
import { queryKeys } from "../keys";

const bytesToGigaBytes = (bytes: number) => bytes / 1024 / 1024 / 1024;

export const getSystemInfoQuery = queryOptions({
  queryKey: [queryKeys.system],
  queryFn: async () => {
    const systemInfo = await getSystemInfo();

    return {
      memoryTotal: Math.round(bytesToGigaBytes(systemInfo.memory_total)),
      memoryUsed: Math.round(bytesToGigaBytes(systemInfo.memory_used)),
      cpuCores: systemInfo.cpu_cores,
    };
  },
  throwOnError: true,
});
