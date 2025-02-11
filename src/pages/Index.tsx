
import ScoreDistribution from "@/components/ScoreDistribution";
import TopicsList from "@/components/TopicsList";
import PerformanceSummary from "@/components/PerformanceSummary";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Score Report</h1>
          <p className="mt-2 text-gray-600">
            Here's how you did. Check out your study recommendations below to optimize your study schedule.
          </p>
        </div>
        
        <ScoreDistribution />
        <PerformanceSummary />
        <TopicsList />
        <ProgressTracker />
      </div>
    </div>
  );
};

export default Index;
