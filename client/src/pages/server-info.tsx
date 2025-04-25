import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaGem, FaLock, FaCalendarAlt, FaBalanceScale, FaUsers, FaServer } from "react-icons/fa";

export default function ServerInfoPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-minecraft-gray py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-minecraft text-center text-minecraft-gold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Server Information
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-minecraft-darkgray p-6 rounded minecraft-border"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-2xl text-minecraft-gold mr-3" />
              <h3 className="text-xl font-minecraft text-minecraft-gold">Server Rules</h3>
            </div>
            <ul className="space-y-2 list-disc pl-4">
              <li>No griefing or stealing from other players</li>
              <li>Be respectful in chat - no harassment or excessive profanity</li>
              <li>No hacking, cheating or using exploits</li>
              <li>No spamming in chat or with redstone contraptions</li>
              <li>Only advertise on designated bulletin boards</li>
              <li>PvP only in designated areas or with mutual consent</li>
              <li>Report any issues to server staff</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-minecraft-darkgray p-6 rounded minecraft-border"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FaGem className="text-2xl text-minecraft-blue mr-3" />
              <h3 className="text-xl font-minecraft text-minecraft-gold">Server Features</h3>
            </div>
            <ul className="space-y-2 list-disc pl-4">
              <li>Custom economy system with player shops</li>
              <li>Land claiming and protection</li>
              <li>Custom enchantments and items</li>
              <li>Weekly events and competitions</li>
              <li>Balanced gameplay with minimal restrictions</li>
              <li>Active staff team to help players</li>
              <li>Regular world backups for security</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-minecraft-darkgray p-6 rounded minecraft-border mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-minecraft text-minecraft-gold mb-4 text-center">How to Join</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-minecraft-dirt w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-minecraft text-2xl">1</span>
              </div>
              <h4 className="font-minecraft text-minecraft-green mb-2">Launch Minecraft</h4>
              <p>Start Minecraft Java Edition (version 1.19.2)</p>
            </div>
            
            <div className="text-center">
              <div className="bg-minecraft-dirt w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-minecraft text-2xl">2</span>
              </div>
              <h4 className="font-minecraft text-minecraft-green mb-2">Add Server</h4>
              <p>Click "Multiplayer" then "Add Server"</p>
            </div>
            
            <div className="text-center">
              <div className="bg-minecraft-dirt w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-minecraft text-2xl">3</span>
              </div>
              <h4 className="font-minecraft text-minecraft-green mb-2">Enter IP</h4>
              <p>Enter "kingdomoffap.falixsrv.me" and click "Done"</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-minecraft-darkgray p-6 rounded minecraft-border">
            <div className="flex items-center mb-4">
              <FaServer className="text-2xl text-minecraft-green mr-3" />
              <h3 className="text-xl font-minecraft text-minecraft-gold">Technical Details</h3>
            </div>
            <ul className="space-y-2">
              <li><span className="font-semibold">Game Version:</span> Minecraft Java 1.12.2</li>
              <li><span className="font-semibold">Server Software:</span> Paper</li>
              <li><span className="font-semibold">Server IP:</span> kingdomoffap.falixsrv.me</li>
              <li><span className="font-semibold">Location:</span> North America</li>
              <li><span className="font-semibold">Anti-Cheat:</span> Custom system</li>
            </ul>
          </div>
          
          <div className="bg-minecraft-darkgray p-6 rounded minecraft-border">
            <div className="flex items-center mb-4">
              <FaUsers className="text-2xl text-minecraft-gold mr-3" />
              <h3 className="text-xl font-minecraft text-minecraft-gold">Community</h3>
            </div>
            <p className="mb-4">Join our community on these platforms:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-minecraft-dirt p-3 rounded text-center">
                <p className="font-minecraft">Discord</p>
                <p className="text-sm">discord.gg/fapcraft</p>
              </div>
              <div className="bg-minecraft-dirt p-3 rounded text-center">
                <p className="font-minecraft">Forums</p>
                <p className="text-sm">forums.fapcraft.net</p>
              </div>
              <div className="bg-minecraft-dirt p-3 rounded text-center">
                <p className="font-minecraft">YouTube</p>
                <p className="text-sm">@FapCraftMC</p>
              </div>
              <div className="bg-minecraft-dirt p-3 rounded text-center">
                <p className="font-minecraft">Twitter</p>
                <p className="text-sm">@FapCraftMC</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
