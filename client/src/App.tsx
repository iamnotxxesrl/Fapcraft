import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import News from "@/pages/news";
import Screenshots from "@/pages/screenshots";
import ServerInfo from "@/pages/server-info";
import Stats from "@/pages/stats";

function Router() {
  // Prefetch important data when application loads
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["/api/server-status"],
    });
    
    queryClient.prefetchQuery({
      queryKey: ["/api/news"],
    });
    
    queryClient.prefetchQuery({
      queryKey: ["/api/screenshots"],
    });
    
    queryClient.prefetchQuery({
      queryKey: ["/api/stats"],
    });
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/news" component={News} />
          <Route path="/screenshots" component={Screenshots} />
          <Route path="/stats" component={Stats} />
          <Route path="/server-info" component={ServerInfo} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
