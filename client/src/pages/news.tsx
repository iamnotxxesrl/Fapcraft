import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import NewsCard from "@/components/news-card";
import type { NewsItem } from "@/types";

export default function NewsPage() {
  const { data: newsItems, isLoading, isError, error } = useQuery<NewsItem[]>({
    queryKey: ["/api/news"],
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-minecraft-darkgray py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-minecraft text-center text-minecraft-gold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          News & Announcements
        </motion.h1>
        
        <motion.p 
          className="text-center max-w-2xl mx-auto mb-12 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Stay up to date with the latest happenings, updates, and events in the Kingdom of FapCraft!
        </motion.p>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-white">Loading news items...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading news: {error instanceof Error ? error.message : "Unknown error"}</p>
          </div>
        ) : newsItems && newsItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white">No news items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
