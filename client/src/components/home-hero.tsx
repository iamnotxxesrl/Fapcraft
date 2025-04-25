import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1623934199123-4079f69abce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0IGxhbmRzY2FwZXN8fHx8fHwxNzAxNjIzNTYw&ixlib=rb-4.0.3&q=80&w=1080" 
        alt="Minecraft Landscape" 
        className="w-full h-[500px] object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-minecraft text-minecraft-gold drop-shadow-lg mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to the Kingdom
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl max-w-2xl mb-8 drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A survival Minecraft server with an epic community and endless adventures
        </motion.p>
        <motion.div 
          className="minecraft-button bg-minecraft-green px-6 py-3 text-xl font-minecraft text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          role="button"
        >
          <span className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" fill="#5DAE32" />
              <rect x="6" y="6" width="4" height="4" fill="#458A1A" />
              <rect x="14" y="6" width="4" height="4" fill="#458A1A" />
              <rect x="6" y="14" width="12" height="4" fill="#458A1A" />
            </svg>
            JOIN OUR SERVER NOW
          </span>
        </motion.div>
        <motion.div 
          className="mt-8 minecraft-border bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-minecraft-gold font-minecraft tracking-wider">
            SERVER IP: <span className="bg-minecraft-darkgray px-2 py-1 select-all">kingdomoffap.falixsrv.me</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
