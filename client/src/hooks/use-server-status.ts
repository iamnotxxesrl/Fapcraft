import { useQuery } from "@tanstack/react-query";
import { ServerStatus } from "@/lib/types";

export default function useServerStatus() {
  const { data, isLoading, error } = useQuery<ServerStatus>({
    queryKey: ['/api/server-status'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Default fallback values for when data is still loading or API call fails
  // Shows an unavailable server with no players connected
  const defaultStatus: ServerStatus = {
    isOnline: false,
    playerCount: 0,
    maxPlayers: 100,
    peakToday: 0
  };

  return {
    isOnline: data?.isOnline ?? defaultStatus.isOnline,
    playerCount: data?.playerCount ?? defaultStatus.playerCount,
    maxPlayers: data?.maxPlayers ?? defaultStatus.maxPlayers,
    peakToday: data?.peakToday ?? defaultStatus.peakToday,
    isLoading,
    error
  };
}
