import { useQuery } from "@tanstack/react-query";

interface GetVersionsResponse {
  latest: {
    release: string;
    snapshot: string;
  };
  versions: {
    id: string;
    type: "snapshot" | "release" | "old_beta" | "old_alpha";
    url: string;
    time: string;
    releaseTime: string;
  }[];
}

export function useMinecraftVersions() {
  return useQuery({
    queryKey: ["minecraft-versions"],
    queryFn: async ({ signal }) => {
      const response = await fetch(
        "https://piston-meta.mojang.com/mc/game/version_manifest.json",
        { signal },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch versions");
      }

      const data: GetVersionsResponse = await response.json();

      return data.versions.filter((version) => version.type === "release");
    },
  });
}
