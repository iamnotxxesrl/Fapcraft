import { motion } from "framer-motion";
import type { NewsItem } from "@/types";

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const { title, content, date, image, author } = news;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <motion.div 
      className="bg-minecraft-darkgray minecraft-border overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <div className="minecraft-button p-1 bg-minecraft-stone">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 bg-minecraft-dirt px-3 py-1 font-minecraft text-white text-shadow text-xs transform rotate-3">
          NEW!
        </div>
      </div>
      
      <div className="bg-minecraft-dirt p-3">
        <h3 className="text-xl font-minecraft text-white text-shadow">{title}</h3>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-minecraft text-minecraft-green">{formattedDate}</span>
          <span className="text-sm text-gray-400">By: {author}</span>
        </div>
        
        <p className="mb-4 text-gray-200">{`${content.substring(0, 100)}${content.length > 100 ? '...' : ''}`}</p>
        
        <div className="flex justify-between items-center">
          <button className="minecraft-button bg-minecraft-wood text-white px-4 py-2 text-sm font-minecraft">
            READ MORE
          </button>
          
          <div className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" className="mr-1">
              <rect width="24" height="24" fill="#5C4033" />
              <rect x="4" y="4" width="16" height="4" fill="#7CB342" />
              <rect x="4" y="12" width="16" height="4" fill="#7CB342" />
              <rect x="4" y="20" width="16" height="4" fill="#7CB342" />
            </svg>
            <span className="text-xs text-gray-400">NEWS</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
