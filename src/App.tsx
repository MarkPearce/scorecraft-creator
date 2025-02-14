
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Concept1 from "./pages/Concept1";
import Concept2 from "./pages/Concept2";
import Concept3 from "./pages/Concept3";
import PeerGroup from "./pages/PeerGroup";
import TopicBreakdown from "./pages/TopicBreakdown";
import PerformanceBarChart from "./pages/PerformanceBarChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/concept1" element={<Concept1 />} />
        <Route path="/concept2" element={<Concept2 />} />
        <Route path="/concept3" element={<Concept3 />} />
        <Route path="/concept5" element={<PeerGroup />} />
        <Route path="/topic-breakdown" element={<TopicBreakdown />} />
        <Route path="/performance" element={<PerformanceBarChart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
