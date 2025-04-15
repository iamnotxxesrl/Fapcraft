import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServerInfoSection from "@/components/ServerInfoSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewsSection from "@/components/NewsSection";
import GallerySection from "@/components/GallerySection";
import RulesSection from "@/components/RulesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { ServerContent } from "@/lib/types";

export default function Home() {
  const { data: serverContent, isLoading: isLoadingContent } = useQuery<ServerContent>({
    queryKey: ['/api/content'],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServerInfoSection />
        <FeaturesSection 
          features={serverContent?.serverFeatures || []} 
          isLoading={isLoadingContent} 
        />
        <NewsSection />
        <GallerySection 
          galleryImages={serverContent?.galleryImages || []} 
          isLoading={isLoadingContent} 
        />
        <RulesSection 
          rules={serverContent?.serverRules || []} 
          isLoading={isLoadingContent} 
        />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
