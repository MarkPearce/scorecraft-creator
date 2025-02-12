import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopicsList from "@/components/TopicsList";
import PerformanceGraph from "@/components/PerformanceGraph";
import ScoreDistribution from "@/components/ScoreDistribution";
import PercentileDisplay from "@/components/PercentileDisplay";

const TopicBreakdown = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Topic Breakdown</h1>
          <div className="flex items-center justify-center text-gray-600 mb-8">
            <BookOpen className="h-5 w-5 mr-2" />
            <p>Detailed analysis of your performance by topic</p>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
            <div className="flex justify-between items-center">
              <PerformanceGraph
                score={238}
                targetScore={245}
                range={{ min: 180, max: 300 }}
              />
              <PercentileDisplay percentile={75} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Study Progress</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Questions Tagged</span>
                <span className="font-semibold">19 of 2261</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Targets Met</span>
                <span className="font-semibold">0 of 2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time to Target</span>
                <span className="font-semibold">~4 weeks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Score Distribution Chart */}
        <ScoreDistribution />

        {/* Systems Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Systems Breakdown</h2>
          <TopicsList />
        </div>
      </div>
    </div>
  );
};

export default TopicBreakdown;
