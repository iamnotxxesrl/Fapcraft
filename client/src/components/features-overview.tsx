import { motion } from "framer-motion";
import { FaUsers, FaGem, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-2xl" />,
    title: "Friendly Community",
    description: "Join our active community of players and make new friends while exploring our world."
  },
  {
    icon: <FaGem className="text-2xl" />,
    title: "Economy System",
    description: "Trade with other players, earn money, and build your wealth through our custom economy."
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Land Protection",
    description: "Claim land and protect your builds with our advanced protection system."
  }
];

export default function FeaturesOverview() {
  return (
    <section className="bg-minecraft-darkgray py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-8 bg-minecraft-dirt"></div>
      <div className="container mx-auto px-4 pt-8">
        <motion.div
          className="minecraft-border bg-minecraft-stone p-4 text-center mb-12 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-minecraft text-white text-shadow">SERVER FEATURES</h2>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-minecraft-gold px-4 py-1 minecraft-button">
            <span className="font-minecraft text-sm">EXCLUSIVE</span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="minecraft-border bg-minecraft-gray flex flex-col items-center text-center overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-minecraft-dirt w-full py-3 flex items-center justify-center">
                <h3 className="text-xl font-minecraft text-white text-shadow">{feature.title}</h3>
              </div>
              
              <div className="p-6">
                <div className="minecraft-button bg-minecraft-green w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <p className="text-gray-200">{feature.description}</p>
                
                <div className="mt-4 pt-4 border-t border-minecraft-dirt">
                  <button className="minecraft-button bg-minecraft-wood text-white px-4 py-2 text-sm font-minecraft">
                    LEARN MORE
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
