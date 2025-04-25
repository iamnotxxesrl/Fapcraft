import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ScreenshotUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest("POST", "/api/screenshots", formData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Upload successful",
        description: "Your screenshot has been uploaded!",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/screenshots"] });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload screenshot. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  });
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    if (files && files.length) {
      handleFiles(files);
    }
  }, []);
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      handleFiles(files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("screenshot", file);
      formData.append("title", file.name.split(".")[0] || "My Screenshot");
      uploadMutation.mutate(formData);
      
      // Reset file input for future uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      toast({
        title: "Invalid file",
        description: "Please select an image file.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <motion.div 
      className={`max-w-xl mx-auto mb-16 minecraft-border bg-minecraft-darkgray p-8 text-center ${isDragging ? "border-minecraft-green" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="bg-minecraft-dirt p-4 mb-4">
        <h3 className="text-2xl font-minecraft text-white mb-2">SHARE YOUR SCREENSHOTS</h3>
        <div className="bg-minecraft-gray p-2">
          <p className="text-gray-200 font-minecraft">Show off your best builds and adventures!</p>
        </div>
      </div>
      
      <div 
        className={`minecraft-button bg-minecraft-stone p-6 text-center mb-4 cursor-pointer transition duration-300 ${isDragging ? "bg-minecraft-green" : ""}`}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center">
          <FaCloudUploadAlt className="text-5xl text-minecraft-gold mb-4 mx-auto" />
          <p className="font-minecraft text-white mb-2">DROP YOUR IMAGE HERE</p>
          <p className="text-sm text-gray-300">or click to browse files</p>
          
          {uploadMutation.isPending && (
            <div className="mt-4 w-48 h-2 bg-gray-700 mx-auto overflow-hidden">
              <div className="h-full bg-minecraft-green animate-progress"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <label 
          htmlFor="screenshot-upload" 
          className="minecraft-button bg-minecraft-green text-white px-6 py-3 cursor-pointer font-minecraft"
        >
          {uploadMutation.isPending ? "UPLOADING..." : "SELECT IMAGE"}
        </label>
      </div>
      
      <input 
        id="screenshot-upload" 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileInputChange}
        disabled={uploadMutation.isPending}
      />
    </motion.div>
  );
}
