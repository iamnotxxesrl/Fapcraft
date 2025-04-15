import { motion } from "framer-motion";
import { ServerRule } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface RulesSectionProps {
  rules: ServerRule[];
  isLoading: boolean;
}

export default function RulesSection({ rules, isLoading }: RulesSectionProps) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="rules" className="py-20 bg-gradient-to-b from-black to-[#121212]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-minecraft text-4xl font-bold mb-4">Server <span className="text-[#25B049]">Rules</span></h2>
          <p className="max-w-2xl mx-auto text-lg">Please follow these guidelines to keep our community enjoyable for everyone</p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-[#121212] bg-opacity-80 rounded-lg overflow-hidden"
          style={{ boxShadow: "0 0 0 4px #9B4C05, 0 0 0 8px #121212" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-minecraft bg-[#9B4C05] text-white py-3 px-6">
            <h3 className="text-xl font-bold">Community Guidelines</h3>
          </div>
          
          <motion.div 
            className="p-6 space-y-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex items-start">
                  <Skeleton className="w-10 h-10 flex-shrink-0 rounded-sm mr-4" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-1" />
                  </div>
                </div>
              ))
            ) : (
              // Display rules
              rules.map((rule) => (
                <motion.div key={rule.id} className="flex items-start" variants={item}>
                  <div className="w-10 h-10 flex-shrink-0 bg-[#9B4C05] rounded-sm flex items-center justify-center mr-4">
                    <span className="font-minecraft font-bold text-white">{rule.order}</span>
                  </div>
                  <div>
                    <h4 className="font-minecraft text-lg font-bold mb-1">{rule.title}</h4>
                    <p className="text-gray-300">{rule.description}</p>
                  </div>
                </motion.div>
              ))
            )}
            
            <motion.div 
              className="mt-8 p-4 bg-black bg-opacity-30 rounded"
              variants={item}
            >
              <p className="italic text-gray-400 text-sm">These rules are subject to change. The server administration reserves the right to take action as needed to maintain a positive community environment.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
