import { FaDiscord, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-minecraft-brown border-t-4 border-minecraft-dirt text-center py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center mb-6">
          <a href="https://discord.gg/34xYAwTva7" target="_blank" rel="noopener noreferrer" className="mx-3 text-2xl text-minecraft-gold hover:text-white transition-colors">
            <div className="minecraft-button bg-minecraft-gray p-2">
              <FaDiscord />
            </div>
          </a>
          <a href="#" className="mx-3 text-2xl text-minecraft-gold hover:text-white transition-colors">
            <div className="minecraft-button bg-minecraft-gray p-2">
              <FaTwitter />
            </div>
          </a>
          <a href="#" className="mx-3 text-2xl text-minecraft-gold hover:text-white transition-colors">
            <div className="minecraft-button bg-minecraft-gray p-2">
              <FaYoutube />
            </div>
          </a>
          <a href="#" className="mx-3 text-2xl text-minecraft-gold hover:text-white transition-colors">
            <div className="minecraft-button bg-minecraft-gray p-2">
              <FaInstagram />
            </div>
          </a>
        </div>
        
        <div className="minecraft-border bg-minecraft-darkgray py-3 px-4 inline-block mb-4">
          <p className="mb-2 font-minecraft text-minecraft-gold">Kingdom of FapCraft &copy; 2025. All rights reserved.</p>
          <p className="text-sm text-white opacity-75 mb-1">Not affiliated with Mojang Studios or Microsoft.</p>
          <p className="text-sm text-minecraft-green">Join our Discord: discord.gg/34xYAwTva7</p>
        </div>
      </div>
    </footer>
  );
}
