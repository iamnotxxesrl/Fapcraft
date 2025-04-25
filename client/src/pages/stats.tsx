import { useEffect } from "react";
import { motion } from "framer-motion";
import ServerStats from "@/components/server-stats";
import { useQuery } from "@tanstack/react-query";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MonthlyStats {
  month: string;
  players: number;
  newPlayers: number;
}

export default function StatsPage() {
  const { data: monthlyStats } = useQuery<MonthlyStats[]>({
    queryKey: ["/api/stats/monthly"],
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-minecraft-darkgray">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-minecraft text-center text-minecraft-gold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Server Statistics
        </motion.h1>
        
        <ServerStats />
        
        <div className="mt-16 bg-minecraft-gray p-6 rounded minecraft-border">
          <motion.h3 
            className="text-xl font-minecraft text-minecraft-gold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Monthly Player Growth
          </motion.h3>
          
          <motion.div 
            className="h-80 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {monthlyStats ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyStats}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#FFF" />
                  <YAxis stroke="#FFF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#292929', 
                      border: '2px solid #8B4513',
                      color: '#FFF' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="players" 
                    stroke="#7CB342" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                    name="Active Players"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="newPlayers" 
                    stroke="#FFC107" 
                    strokeWidth={2} 
                    name="New Players"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex justify-center items-center">
                <p>Loading monthly statistics...</p>
              </div>
            )}
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-minecraft-gray p-6 rounded minecraft-border">
            <h3 className="text-xl font-minecraft text-minecraft-gold mb-4 text-center">Top Player Time</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>MineKing23 - 342 hours</li>
              <li>Creeper_Slayer - 298 hours</li>
              <li>DiamondQueen - 276 hours</li>
              <li>BlockMaster99 - 245 hours</li>
              <li>EnderDragon42 - 221 hours</li>
            </ol>
          </div>
          
          <div className="bg-minecraft-gray p-6 rounded minecraft-border">
            <h3 className="text-xl font-minecraft text-minecraft-gold mb-4 text-center">Most Active Times</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Weekdays:</span>
                <span>5 PM - 11 PM EST</span>
              </li>
              <li className="flex justify-between">
                <span>Weekends:</span>
                <span>12 PM - 2 AM EST</span>
              </li>
              <li className="flex justify-between">
                <span>Peak Day:</span>
                <span>Saturday</span>
              </li>
              <li className="flex justify-between">
                <span>Peak Time:</span>
                <span>8 PM EST</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-minecraft-gray p-6 rounded minecraft-border">
            <h3 className="text-xl font-minecraft text-minecraft-gold mb-4 text-center">Server Records</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Most Players:</span>
                <span>42 (Dec 25, 2023)</span>
              </li>
              <li className="flex justify-between">
                <span>Longest Uptime:</span>
                <span>64 days</span>
              </li>
              <li className="flex justify-between">
                <span>Biggest Event:</span>
                <span>Summer PvP Tournament</span>
              </li>
              <li className="flex justify-between">
                <span>Most Diamonds Mined:</span>
                <span>1,247 (MineKing23)</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
