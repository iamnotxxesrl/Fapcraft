import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import HomeHero from "@/components/home-hero";
import FeaturesOverview from "@/components/features-overview";
import NewsCard from "@/components/news-card";
import ScreenshotCard from "@/components/screenshot-card";
import ServerStats from "@/components/server-stats";
import { Link } from "wouter";
import type { NewsItem, Screenshot } from "@/types";

export default function Home() {
  const { data: newsItems, isLoading: isNewsLoading } = useQuery<NewsItem[]>({
    queryKey: ["/api/news"],
  });
  
  const { data: screenshots, isLoading: isScreenshotsLoading } = useQuery<Screenshot[]>({
    queryKey: ["/api/screenshots"],
  });
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <HomeHero />
      
      <FeaturesOverview />
      
      {/* News Section */}
      <section id="news" className="py-16 bg-minecraft-gray">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-minecraft text-center text-minecraft-gold mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Latest News & Updates
          </motion.h2>
          
          {isNewsLoading ? (
            <div className="text-center py-12">Loading news...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems && newsItems.slice(0, 3).map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/news">
              <motion.button 
                className="minecraft-button bg-minecraft-dirt px-5 py-2 font-minecraft"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More News
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Screenshots Preview Section */}
      <section id="screenshots" className="py-16 bg-minecraft-darkgray">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-minecraft text-center text-minecraft-gold mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Server Screenshots
          </motion.h2>
          
          {isScreenshotsLoading ? (
            <div className="text-center py-12">Loading screenshots...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {screenshots && screenshots.slice(0, 4).map((screenshot) => (
                <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/screenshots">
              <motion.button 
                className="minecraft-button bg-minecraft-dirt px-5 py-2 font-minecraft"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Screenshots
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      
      <ServerStats />
      
      {/* Server Info Preview */}
      <section id="info" className="py-16 bg-minecraft-gray">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-minecraft text-center text-minecraft-gold mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Server Information
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-minecraft-darkgray p-6 rounded minecraft-border">
              <h3 className="text-xl font-minecraft text-minecraft-gold mb-4">Server Rules</h3>
              <ul className="space-y-2 list-disc pl-4">
                <li>No griefing or stealing from other players</li>
                <li>Be respectful in chat - no harassment or excessive profanity</li>
                <li>No hacking, cheating or using exploits</li>
                <li>No spamming in chat or with redstone contraptions</li>
                <li>Only advertise on designated bulletin boards</li>
              </ul>
            </div>
            
            <div className="bg-minecraft-darkgray p-6 rounded minecraft-border">
              <h3 className="text-xl font-minecraft text-minecraft-gold mb-4">Join Us Today</h3>
              <p className="mb-4">Ready to start your adventure in the Kingdom of FapCraft? Join our server using the IP address below!</p>
              <div className="bg-minecraft-dirt p-4 text-center rounded">
                <p className="font-minecraft text-white">kingdomoffap.falixsrv.me</p>
              </div>
              <div className="mt-4 text-center">
                <Link href="/server-info">
                  <motion.button 
                    className="minecraft-button bg-minecraft-wood px-5 py-2 font-minecraft"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
