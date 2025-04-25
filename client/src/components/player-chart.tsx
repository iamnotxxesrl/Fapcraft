import { motion } from "framer-motion";
import type { DailyPlayerCount } from "@/types";

interface PlayerChartProps {
  activityData: DailyPlayerCount[];
}

export default function PlayerChart({ activityData }: PlayerChartProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // If no data is provided, create placeholder data
  const data = activityData.length > 0 ? activityData : days.map((day, index) => ({
    id: index,
    date: day,
    count: 0,
    percentage: 0
  }));
  
  return (
    <div className="h-80 w-full minecraft-border bg-minecraft-darkgray p-4">
      <div className="text-center mb-4">
        <h3 className="font-minecraft text-minecraft-gold text-xl">PLAYER ACTIVITY</h3>
        <p className="text-gray-300 text-sm">Players online during the week</p>
      </div>
      <div className="h-48 flex items-end justify-between px-4 pt-4 pb-2 border-b-2 border-minecraft-dirt">
        {data.map((day, index) => (
          <motion.div 
            key={index}
            className="flex flex-col items-center w-1/7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="relative w-full max-w-[40px] h-full flex flex-col-reverse justify-start items-center">
              <motion.div 
                className="minecraft-button bg-minecraft-green w-full"
                style={{ imageRendering: 'pixelated' }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(day.percentage || 0, 5)}%` }}
                transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
              >
                {day.count > 0 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-minecraft-gold text-xs px-1 font-minecraft">
                    {day.count}
                  </div>
                )}
              </motion.div>
            </div>
            <span className="text-xs mt-3 font-minecraft text-white">{typeof day.date === 'string' ? day.date.slice(0, 3) : days[index]}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-3 px-4">
        <div className="text-xs text-gray-400">0</div>
        <div className="text-xs text-gray-400">Peak Players: {Math.max(...data.map(d => d.count))}</div>
      </div>
    </div>
  );
}
