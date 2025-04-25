import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { ServerStatus } from "@/types";
import { apiRequest } from "@/lib/queryClient";

export default function ServerStatusBar() {
  const { data: serverStatus, isLoading, isError } = useQuery<ServerStatus>({
    queryKey: ["/api/server-status"],
    refetchInterval: 60000, // Refetch every minute
  });
  
  const [peakPlayers, setPeakPlayers] = useState(0);
  
  useEffect(() => {
    if (serverStatus && serverStatus.online && serverStatus.players.online > peakPlayers) {
      setPeakPlayers(serverStatus.players.online);
    }
  }, [serverStatus, peakPlayers]);
  
  // Determine status indicator color
  const getStatusColor = () => {
    if (isLoading) return "bg-gray-500";
    if (isError) return "bg-red-500";
    return serverStatus?.online ? "bg-minecraft-green" : "bg-red-500";
  };
  
  // Determine status text
  const getStatusText = () => {
    if (isLoading) return "Checking server status...";
    if (isError) return "Status check failed";
    return serverStatus?.online ? "Server Online" : "Server Offline";
  };
  
  // Determine player count
  const getPlayerCount = () => {
    if (isLoading || isError || !serverStatus?.online) {
      return "0/0 players";
    }
    return `${serverStatus.players.online}/${serverStatus.players.max} players`;
  };
  
  // Get Minecraft version
  const getVersion = () => {
    if (isLoading || isError || !serverStatus?.online || !serverStatus.version) {
      return "";
    }
    // Check if version is an object and handle it properly
    if (typeof serverStatus.version === 'object') {
      return "MC 1.12.2";
    }
    return `MC ${serverStatus.version}`;
  };
  
  return (
    <div id="server-status" className="flex items-center justify-center">
      <div className="minecraft-border bg-minecraft-darkgray p-2 flex items-center text-sm lg:text-base font-minecraft">
        <motion.span 
          className={`inline-block h-4 w-4 ${getStatusColor()} mr-2 border border-black`}
          animate={serverStatus?.online ? { scale: [1, 1.2, 1] } : {}}
          transition={serverStatus?.online ? { repeat: Infinity, duration: 2 } : {}}
          style={{ imageRendering: 'pixelated' }}
        />
        <span className="text-white">{getStatusText()}</span>
        <span className="mx-2 text-gray-500">|</span>
        <span className="text-minecraft-gold">{getPlayerCount()}</span>
        {getVersion() && (
          <>
            <span className="mx-2 text-gray-500">|</span>
            <span className="text-minecraft-blue">{getVersion()}</span>
          </>
        )}
        <span className="mx-2 text-gray-500">|</span>
        <span className="text-green-300">kingdomoffap.falixsrv.me</span>
      </div>
    </div>
  );
}
