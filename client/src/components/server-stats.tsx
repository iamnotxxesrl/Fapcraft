import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PlayerChart from "./player-chart";
import type { ServerStat } from "@/types";

export default function ServerStats() {
  const { data: stats, isLoading } = useQuery<ServerStat>({
    queryKey: ["/api/stats"],
  });
  
  const { data: activityData, isLoading: isActivityLoading } = useQuery({
    queryKey: ["/api/stats/activity"],
  });
  
  const statsItems = [
    {
      title: "Peak Players",
      value: stats?.peakPlayers || 0,
      maxValue: stats?.maxPlayers || 100,
      color: "bg-minecraft-green"
    },
    {
      title: "Uptime",
      value: stats?.uptime || 0,
      maxValue: 100,
      color: "bg-minecraft-blue",
      suffix: "%"
    },
    {
      title: "Total Players",
      value: stats?.totalPlayers || 0,
      maxValue: 2000,
      color: "bg-minecraft-gold",
      formatter: (val: number) => val.toLocaleString()
    },
    {
      title: "World Size",
      value: stats?.worldSize || "0 GB",
      maxValue: 10,
      color: "bg-minecraft-dirt",
      custom: true
    }
  ];
  
  const getPercentage = (value: number, maxValue: number) => {
    return Math.min(100, Math.max(0, (value / maxValue) * 100));
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-minecraft-brown to-minecraft-darkgray">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-minecraft text-center text-minecraft-gold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Server Statistics
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsItems.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-minecraft-gray p-6 rounded minecraft-border text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className={`text-xl font-minecraft text-${item.color.replace('bg-', '')} mb-2`}>
                {item.title}
              </h3>
              <div className="text-4xl font-minecraft text-minecraft-gold mb-3">
                {item.custom 
                  ? stats?.worldSize 
                  : item.formatter 
                    ? item.formatter(item.value) 
                    : `${item.value}${item.suffix || ''}`
                }
              </div>
              <div className="w-full bg-minecraft-darkgray rounded-full h-4 overflow-hidden">
                <motion.div 
                  className={`${item.color} h-full animate-progress w-0`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.custom ? 42 : getPercentage(item.value, item.maxValue)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Player Activity Chart */}
        <div className="mt-16 bg-minecraft-gray p-6 rounded minecraft-border">
          <h3 className="text-xl font-minecraft text-minecraft-gold mb-6 text-center">Player Activity (Last 7 Days)</h3>
          {isActivityLoading ? (
            <div className="h-64 flex justify-center items-center">
              <p>Loading activity data...</p>
            </div>
          ) : (
            <PlayerChart activityData={activityData || []} />
          )}
        </div>
      </div>
    </section>
  );
}
