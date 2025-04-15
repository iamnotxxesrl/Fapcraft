import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import useServerStatus from "@/hooks/use-server-status";

export default function ServerInfoSection() {
  const { toast } = useToast();
  const { isOnline, playerCount, maxPlayers, peakToday, isLoading } = useServerStatus();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyServerAddress = () => {
    navigator.clipboard.writeText("fapcraft.sdlf.fun");
    setIsCopied(true);
    
    toast({
      title: "Server address copied!",
      description: "fapcraft.sdlf.fun has been copied to your clipboard."
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-16 bg-[#121212] bg-opacity-70">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Server Address */}
          <motion.div 
            className="bg-[#121212] bg-opacity-80 p-6 rounded-lg transform transition duration-300 hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#25B049] rounded-sm flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-[#121212]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
              </div>
              <h3 className="font-minecraft text-xl mb-2">Server Address</h3>
              <div 
                className="font-mono bg-black bg-opacity-50 p-3 rounded mt-4 flex items-center justify-between group cursor-pointer"
                onClick={handleCopyServerAddress}
              >
                <span>fapcraft.sdlf.fun</span>
                <motion.button 
                  className={`${isCopied ? 'text-white' : 'opacity-0 group-hover:opacity-100'} transition duration-300 text-[#25B049] hover:text-white`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isCopied ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Player Count */}
          <motion.div 
            className="bg-[#121212] bg-opacity-80 p-6 rounded-lg transform transition duration-300 hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#25B049] rounded-sm flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-[#121212]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-minecraft text-xl mb-2">Active Players</h3>
              <div className="flex justify-center items-center mt-4">
                {isLoading ? (
                  <div className="text-2xl font-minecraft text-gray-400 animate-pulse">
                    Loading...
                  </div>
                ) : (
                  <>
                    <div className={`text-4xl font-bold font-minecraft ${isOnline ? 'text-[#25B049]' : 'text-red-500'}`}>
                      {playerCount}
                    </div>
                    <div className="text-lg ml-2">/ {maxPlayers}</div>
                  </>
                )}
              </div>
              <div className="mt-2 text-sm">
                {isLoading ? (
                  <span className="animate-pulse">Checking peak...</span>
                ) : (
                  <>
                    Peak today: <span className="text-[#25B049]">{peakToday}</span>
                  </>
                )}
              </div>
              {!isLoading && !isOnline && (
                <div className="mt-3 text-sm font-minecraft text-red-500 bg-red-900 bg-opacity-30 rounded-sm py-1">
                  Server offline
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Discord */}
          <motion.div 
            className="bg-[#121212] bg-opacity-80 p-6 rounded-lg transform transition duration-300 hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#5865F2] rounded-sm flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 512" 
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                >
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
                </svg>
              </div>
              <h3 className="font-minecraft text-xl mb-2">Join Our Discord</h3>
              <p className="mb-4">Chat, get support, and stay updated</p>
              <motion.a 
                href="https://discord.gg/34xYAwTva7" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono bg-[#5865F2] hover:bg-opacity-90 text-white p-3 rounded mt-2 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                discord.gg/34xYAwTva7
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
