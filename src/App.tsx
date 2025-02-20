
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import TopicBreakdown from "./pages/TopicBreakdown";
import SinglePageReport from "./pages/SinglePageReport";
import OverallPerformancePage from "./pages/components/OverallPerformancePage";
import PerformanceScoreCardPage from "./pages/components/PerformanceScoreCardPage";
import PerformanceTrackingPage from "./pages/components/PerformanceTrackingPage";
import PeerGroupPage from "./pages/components/PeerGroupPage";
import TextProjectionPage from "./pages/components/TextProjectionPage";
import PerformanceSummaryPage from "./pages/components/PerformanceSummaryPage";
import RecommendedSessionPage from "./pages/components/RecommendedSessionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={<Report />} />
          <Route path="/topic-breakdown" element={<TopicBreakdown />} />
          <Route path="/single-page-report" element={<SinglePageReport />} />
          <Route path="/components/overall-performance" element={<OverallPerformancePage />} />
          <Route path="/components/performance-score" element={<PerformanceScoreCardPage />} />
          <Route path="/components/performance-tracking" element={<PerformanceTrackingPage />} />
          <Route path="/components/peer-group" element={<PeerGroupPage />} />
          <Route path="/components/text-projection" element={<TextProjectionPage />} />
          <Route path="/components/performance-summary" element={<PerformanceSummaryPage />} />
          <Route path="/components/recommended-session" element={<RecommendedSessionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
