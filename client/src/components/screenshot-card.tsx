import { motion } from "framer-motion";
import type { Screenshot } from "@/types";

interface ScreenshotCardProps {
  screenshot: Screenshot;
}

export default function ScreenshotCard({ screenshot }: ScreenshotCardProps) {
  const { title, imageUrl, author } = screenshot;
  
  return (
    <motion.div 
      className="relative group overflow-hidden minecraft-border bg-minecraft-darkgray"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="minecraft-button p-1 bg-minecraft-stone">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          style={{ imageRendering: 'auto' }}
        />
      </div>
      <div className="p-3 bg-minecraft-dirt text-center">
        <h4 className="text-white font-minecraft truncate text-shadow">{title}</h4>
        <p className="text-sm text-gray-200 font-minecraft">By: {author}</p>
      </div>
      <motion.div 
        className="absolute top-2 right-2 bg-minecraft-green px-2 py-1 text-xs font-minecraft rotate-12"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1, rotate: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        CLICK TO VIEW
      </motion.div>
    </motion.div>
  );
}
