import { motion } from "framer-motion";
import { useState } from "react";
import { GalleryImage } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GallerySectionProps {
  galleryImages: GalleryImage[];
  isLoading: boolean;
}

export default function GallerySection({ galleryImages, isLoading }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-[#121212] to-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-minecraft text-4xl font-bold mb-4">Server <span className="text-[#25B049]">Gallery</span></h2>
          <p className="max-w-2xl mx-auto text-lg">Check out screenshots from our amazing server</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="overflow-hidden rounded-lg">
                <Skeleton className="w-full h-64" />
              </div>
            ))
          ) : (
            // Gallery images
            galleryImages.map((image) => (
              <motion.div 
                key={image.id} 
                className="overflow-hidden rounded-lg transform transition duration-500 hover:scale-105 relative group cursor-pointer"
                variants={item}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.title} 
                  className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="font-minecraft text-white text-lg">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-[#121212] border border-[#25B049]">
          <DialogHeader>
            <DialogTitle className="font-minecraft text-xl text-[#25B049]">
              {selectedImage?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <img 
              src={selectedImage.imageUrl} 
              alt={selectedImage.title} 
              className="w-full object-contain rounded-md max-h-[70vh]"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
