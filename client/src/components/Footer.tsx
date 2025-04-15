import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="mr-2 w-8 h-8 bg-[#25B049] rounded-sm flex items-center justify-center font-minecraft text-[#121212] font-bold">
                F
              </div>
              <h1 className="font-minecraft text-xl font-bold tracking-wider">
                <span className="text-[#25B049]">Fap</span>
                <span className="text-white">Craft</span>
              </h1>
            </div>
            <p className="text-gray-500 mt-2">An 18+ Minecraft experience</p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <div className="flex space-x-6">
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-[#25B049] transition duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="h-5 w-5"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://discord.gg/34xYAwTva7" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#5865F2] transition duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 512" 
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-[#25B049] transition duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="h-5 w-5"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 9.5 11.76c-.07-.07-.12-.15-.17-.24L8.5 21.5h-1a2 2 0 0 1-2-2v-1H4v1a4 4 0 0 0 4 4h2.22c.58.8 1.6 1.4 2.78 1.5a1 1 0 0 0 1-.5A1 1 0 0 0 14 23l-.9-1.34a1 1 0 0 0-.22-.28l-.17-.17a1 1 0 0 1-.21-.35L12 19.1a1 1 0 0 1 0-.45l.37-1.46c.19-.34.32-.57.38-.72H14c.41 0 .72.07.95.21L15 17v.5a1 1 0 0 0 1 1h1v-1a1 1 0 0 1 1-1h4v-1a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v1h-1l-.44-.42C15.19 15.68 14.67 15 14 15h-3a1 1 0 0 0-.49.14l-.69-.7a1 1 0 0 0-.7-.3H8a1 1 0 0 0-1 1v1h1a1 1 0 0 0 .7-.29l.41-.42H10l.2 1c0 .34.14.63.3.9l-1 3.95L8.41 19a1 1 0 0 0-.91-.45L4 19a1 1 0 0 0-.93.6L2 21.67c-.55-1.75-.95-4.28-.95-6.67 0-5.78 3.8-10.7 9.06-12.34l-1.13 2.58L10.7 6.33 12.5 5l1.7-3.43c.27-.03.53-.07.8-.07a11 11 0 0 1 2.45.3H18c0 .7.67 1.44.43 1.97.3 0 0 .58-.58.73-.3.3-.75-.14-.9.44-.01.16-.01.33-.01.5 0 .95.3 1.8.8 2.5v1h1a1 1 0 0 1 1 1v1.33a4.66 4.66 0 0 1-1.5 3.44A11.99 11.99 0 0 0 12 0zm10.93 9.3l-.5.2-.5-.5.5-.5.5.23.5.5-.5.27zm-2.5-4.3l.5.5-.5.5-.5-.13-.5-.5.5-.37.5-.5.5.5zM8.33 12.5H5.67v1h2.66v-1zm11 0h-2.66v1h2.66v-1z" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-[#25B049] transition duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FapCraft. All rights reserved. 18+ only.
          </p>
          
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">Made with </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              className="mx-1"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="#7C4EFF" 
                className="h-4 w-4"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
            <span className="text-gray-500 text-sm"> by the FapCraft team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
