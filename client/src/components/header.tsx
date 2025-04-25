import { Link, useLocation } from "wouter";
import ServerStatusBar from "./server-status";

export default function Header() {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { label: "Home", path: "/" },
    { label: "News", path: "/news" },
    { label: "Screenshots", path: "/screenshots" },
    { label: "Stats", path: "/stats" },
    { label: "Server Info", path: "/server-info" }
  ];
  
  const handleNavigation = (path: string) => {
    setLocation(path);
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <header className="bg-minecraft-brown border-b-4 border-minecraft-dirt">
      <div className="container mx-auto px-4 py-3 flex flex-col items-center">
        <div className="flex items-center mb-3">
          <svg 
            className="mr-3 h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="#8B4513" />
            <rect x="4" y="4" width="4" height="4" fill="#7CB342" />
            <rect x="8" y="4" width="4" height="4" fill="#7CB342" />
            <rect x="12" y="4" width="4" height="4" fill="#7CB342" />
            <rect x="16" y="4" width="4" height="4" fill="#7CB342" />
            <rect x="4" y="8" width="4" height="4" fill="#7CB342" />
            <rect x="16" y="8" width="4" height="4" fill="#7CB342" />
            <rect x="4" y="12" width="4" height="4" fill="#7CB342" />
            <rect x="16" y="12" width="4" height="4" fill="#7CB342" />
            <rect x="4" y="16" width="4" height="4" fill="#7CB342" />
            <rect x="8" y="16" width="4" height="4" fill="#7CB342" />
            <rect x="12" y="16" width="4" height="4" fill="#7CB342" />
            <rect x="16" y="16" width="4" height="4" fill="#7CB342" />
          </svg>
          <h1 className="text-3xl font-minecraft text-minecraft-gold">Kingdom of FapCraft</h1>
        </div>
        
        <div className="w-full flex justify-center">
          <ServerStatusBar />
        </div>
      </div>
      
      <nav className="bg-minecraft-gray border-t-2 border-b-2 border-black">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center text-lg font-minecraft">
            {navItems.map((item) => (
              <li 
                key={item.path}
                className={`minecraft-button bg-minecraft-dirt text-white m-2 px-4 py-2 ${
                  location === item.path ? "before:opacity-100 bg-minecraft-gold" : ""
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
