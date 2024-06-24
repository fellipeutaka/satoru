import { queryOptions } from "@tanstack/react-query";
import { getJavaVersion } from "~/lib/tauri/commands/get-java-version";
import { queryKeys } from "../keys";

export const getJavaVersionQuery = queryOptions({
  queryKey: [queryKeys.java],
  queryFn: getJavaVersion,
});
