import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useServerStatus from "@/hooks/use-server-status";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOnline, playerCount } = useServerStatus();
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when clicking on a menu item
  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full backdrop-blur-sm z-50 border-b-2 border-mc-green transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-90" : "bg-black bg-opacity-70"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div 
              className="mr-2 w-10 h-10 bg-[#25B049] rounded-sm flex items-center justify-center font-minecraft text-black font-bold text-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              F
            </motion.div>
            <h1 className="font-minecraft text-2xl font-bold tracking-wider">
              <span className="text-[#25B049]">Fap</span>
              <span className="text-white">Craft</span>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="font-minecraft transition duration-300 hover:text-[#25B049]">Home</a>
            <a href="#features" className="font-minecraft transition duration-300 hover:text-[#25B049]">Features</a>
            <a href="#news" className="font-minecraft transition duration-300 hover:text-[#25B049]">News</a>
            <a href="#gallery" className="font-minecraft transition duration-300 hover:text-[#25B049]">Gallery</a>
            <a href="#rules" className="font-minecraft transition duration-300 hover:text-[#25B049]">Rules</a>
            <a href="#join" className="font-minecraft transition duration-300 hover:text-[#25B049]">Join Us</a>
          </nav>
          
          {/* Server Status */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center">
              <motion.div 
                className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-[#25B049]' : 'bg-[#FF4545]'}`}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <span className="font-minecraft text-sm">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <span className="text-[#25B049] font-mono">
              {isOnline ? `${playerCount} playing` : 'Maintenance'}
            </span>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#25B049] transition duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 py-4">
                <a 
                  href="#home" 
                  className="font-minecraft transition duration-300 hover:text-[#25B049]"
                  onClick={handleMenuItemClick}
                >
                  Home
                </a>
                <a 
                  href="#features" 
                  className="font-minecraft transition duration-300 hover:text-[#25B049]"
                  onClick={handleMenuItemClick}
                >
                  Features
                </a>
                <a 
                  href="#news" 
                  className="font-minecraft transition duration-300 hover:text-[#25B049]"
                  onClick={handleMenuItemClick}
                >
                  News
                </a>
                <a 
                  href="#gallery" 
                  className="font-minecraft transition duration-300 hover:text-[#25B049]"
                  onClick={handleMenuItemClick}
                >
                  Gallery
                </a>
                <a 
                  href="#rules" 
                  className="font-minecraft transition duration-300 hover:text-[#25B049]"
                  onClick={handleMenuItemClick}
                >
                  Rules
                </a>
                <a 
                  href="#join" 
                  className="font-minecraft transition duration-300 hover:text-[#25B049]"
                  onClick={handleMenuItemClick}
                >
                  Join Us
                </a>
                {/* Mobile Server Status */}
                <div className="flex items-center space-x-3 pt-2 border-t border-gray-700">
                  <div className="flex items-center">
                    <motion.div 
                      className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-[#25B049]' : 'bg-[#FF4545]'}`}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    />
                    <span className="font-minecraft text-sm">{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                  <span className="text-[#25B049] font-mono">
                    {isOnline ? `${playerCount} playing` : 'Maintenance'}
                  </span>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
