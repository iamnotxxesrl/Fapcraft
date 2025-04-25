import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ScreenshotUploader from "@/components/screenshot-uploader";
import ScreenshotCard from "@/components/screenshot-card";
import type { Screenshot } from "@/types";

export default function ScreenshotsPage() {
  const { data: screenshots, isLoading, isError, error } = useQuery<Screenshot[]>({
    queryKey: ["/api/screenshots"],
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-minecraft-darkgray py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-minecraft text-center text-minecraft-gold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Server Screenshots
        </motion.h1>
        
        <motion.p 
          className="text-center max-w-xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Check out our server and player creations, or share your own!
        </motion.p>
        
        <ScreenshotUploader />
        
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading screenshots...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading screenshots: {error instanceof Error ? error.message : "Unknown error"}</p>
          </div>
        ) : screenshots && screenshots.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {screenshots.map((screenshot) => (
              <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p>No screenshots found. Be the first to upload one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
