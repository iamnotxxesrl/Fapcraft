import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { NewsPost } from "@/lib/types";
import { format, formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Form validation schema
const newsFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be less than 100 characters"),
  content: z.string().min(10, "Content must be at least 10 characters long").max(1000, "Content must be less than 1000 characters"),
  author: z.string().optional(),
  isAnonymous: z.boolean().default(false),
});

type NewsFormValues = z.infer<typeof newsFormSchema>;

export default function NewsSection() {
  const { toast } = useToast();
  
  // Get news posts
  const { data: newsPosts, isLoading: isLoadingNews } = useQuery<NewsPost[]>({
    queryKey: ['/api/news'],
  });

  // Form setup
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
      isAnonymous: false,
    },
  });

  // Create news post mutation
  const createNewsMutation = useMutation({
    mutationFn: (data: NewsFormValues) => {
      return apiRequest("POST", "/api/news", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/news'] });
      form.reset();
      toast({
        title: "News submitted!",
        description: "Your post has been added to the server news."
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to submit news",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Submit handler
  const onSubmit = (data: NewsFormValues) => {
    // If anonymous, remove author if any
    if (data.isAnonymous) {
      data.author = "Anonymous";
    } else if (!data.author) {
      // If not anonymous but no author provided, set a default
      data.author = "Unknown Player";
    }
    
    createNewsMutation.mutate(data);
  };

  // Get border color based on index
  const getBorderColor = (index: number) => {
    const colors = ["border-[#25B049]", "border-[#7C4EFF]", "border-[#9B4C05]"];
    return colors[index % colors.length];
  };
  
  // Get circle color based on index
  const getCircleColor = (index: number) => {
    const colors = ["bg-[#25B049]", "bg-[#7C4EFF]", "bg-[#9B4C05]"];
    return colors[index % colors.length];
  };

  // Format date
  const formatDate = (date: Date | string) => {
    try {
      const dateObj = new Date(date);
      return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (error) {
      return "some time ago";
    }
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-black to-[#121212] relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-minecraft text-4xl font-bold mb-4">Server <span className="text-[#25B049]">News</span></h2>
          <p className="max-w-2xl mx-auto text-lg">Stay updated with the latest happenings and announcements</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Feed */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#121212] bg-opacity-80 rounded-lg overflow-hidden" style={{ boxShadow: "0 0 0 4px #25B049, 0 0 0 8px #121212" }}>
              <div className="font-minecraft bg-[#25B049] text-[#121212] py-3 px-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Latest Updates</h3>
                <span className="text-sm">Most recent first</span>
              </div>
              
              <div className="scrollbar-hide h-[450px] overflow-y-auto p-6 space-y-6">
                {isLoadingNews ? (
                  // Loading skeletons
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="border-l-4 border-gray-700 pl-4 pb-6 relative">
                      <div className="flex justify-between items-start mb-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6 mb-1" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-4 w-32" />
                      <div className="absolute left-0 top-0 w-3 h-3 -ml-[6.5px] rounded-full bg-gray-700"></div>
                    </div>
                  ))
                ) : newsPosts && newsPosts.length > 0 ? (
                  // Display news posts
                  newsPosts.map((post, index) => (
                    <div key={post.id} className={`border-l-4 ${getBorderColor(index)} pl-4 pb-6 relative`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{post.title}</h4>
                        <span className="text-sm text-gray-400">{formatDate(post.createdAt!)}</span>
                      </div>
                      <p className="text-gray-300 mb-2">{post.content}</p>
                      <div className="flex items-center text-sm text-gray-400">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-1" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          {post.isAnonymous ? (
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          ) : (
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          )}
                          <circle cx={post.isAnonymous ? "9" : "12"} cy="7" r="4"></circle>
                        </svg>
                        <span>Posted by: {post.author || "Unknown"}</span>
                      </div>
                      <div className={`absolute left-0 top-0 w-3 h-3 -ml-[6.5px] rounded-full ${getCircleColor(index)}`}></div>
                    </div>
                  ))
                ) : (
                  // No posts message
                  <div className="text-center py-8 text-gray-400">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 mx-auto mb-4 text-gray-500" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    <p>No news posts yet. Be the first to share!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Submit News */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#121212] bg-opacity-80 rounded-lg overflow-hidden" style={{ boxShadow: "0 0 0 4px #7C4EFF, 0 0 0 8px #121212" }}>
              <div className="font-minecraft bg-[#7C4EFF] text-white py-3 px-6">
                <h3 className="text-xl font-bold">Submit News</h3>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block font-minecraft text-sm mb-2">Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="News title..."
                            className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#7C4EFF] transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block font-minecraft text-sm mb-2">Content</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Share your news..."
                            className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#7C4EFF] transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block font-minecraft text-sm mb-2">Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your minecraft username"
                            className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#7C4EFF] transition"
                            {...field}
                            disabled={form.watch("isAnonymous")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isAnonymous"
                    render={({ field }) => (
                      <FormItem className="mb-6 flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Post anonymously</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="font-minecraft w-full bg-[#7C4EFF] hover:bg-opacity-90 text-white font-bold py-3 px-4 transition duration-300 transform hover:scale-105"
                    disabled={createNewsMutation.isPending}
                  >
                    {createNewsMutation.isPending ? "Submitting..." : "Submit News"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
