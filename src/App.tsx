
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Concept1 from "./pages/Concept1";
import Concept2 from "./pages/Concept2";
import Concept3 from "./pages/Concept3";
import PerformanceBarChart from "./pages/PerformanceBarChart";
import PeerGroup from "./pages/PeerGroup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/report" element={<Index />} />
          <Route path="/concept1" element={<Concept1 />} />
          <Route path="/concept2" element={<Concept2 />} />
          <Route path="/concept3" element={<Concept3 />} />
          <Route path="/concept4" element={<PerformanceBarChart />} />
          <Route path="/concept5" element={<PeerGroup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
