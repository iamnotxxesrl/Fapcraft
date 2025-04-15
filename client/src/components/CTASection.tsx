import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CTASection() {
  const { toast } = useToast();
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

  return (
    <section id="join" className="py-24 bg-gradient-to-b from-[#121212] to-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-minecraft text-5xl font-bold mb-6">Ready to <span className="text-[#25B049]">Join</span>?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Connect to our Minecraft server now and become part of our growing adult community!</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <motion.div 
              className="bg-[#121212] bg-opacity-90 p-8 rounded-lg text-center"
              style={{ boxShadow: "0 0 0 4px #25B049, 0 0 0 8px #121212" }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-minecraft text-2xl mb-4">Join Our Server</h3>
              <div className="font-mono bg-black bg-opacity-50 p-4 rounded mb-6">
                <span className="text-[#25B049]">fapcraft.sdlf.fun</span>
              </div>
              <p className="mb-6">Add our server to your Minecraft client and start playing today!</p>
              <motion.button 
                className="font-minecraft relative overflow-hidden group px-8 py-4 bg-[#25B049] hover:bg-opacity-90 text-[#121212] font-bold text-lg transition duration-300 transform hover:scale-105 w-full"
                onClick={handleCopyServerAddress}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isCopied ? "Copied!" : "Copy Server Address"}
                <div className="absolute inset-0 bg-white bg-opacity-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="bg-[#121212] bg-opacity-90 p-8 rounded-lg text-center"
              style={{ boxShadow: "0 0 0 4px #7C4EFF, 0 0 0 8px #121212" }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-minecraft text-2xl mb-4">Join Discord</h3>
              <div className="bg-[#5865F2] p-4 rounded mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 512" 
                  className="h-8 w-8 mx-auto text-white"
                  fill="currentColor"
                >
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
                </svg>
              </div>
              <p className="mb-6">Chat with the community, get help, and stay updated!</p>
              <motion.a 
                href="https://discord.gg/34xYAwTva7" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-minecraft block px-8 py-4 bg-[#5865F2] hover:bg-opacity-90 text-white font-bold text-lg transition duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Join Discord Server
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute -bottom-8 left-0 w-full h-16 bg-black"></div>
    </section>
  );
}
