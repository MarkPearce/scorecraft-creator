
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PeerGroup from "@/components/PeerGroup";
import TopicsList from "@/components/TopicsList";
import PerformanceSummary from "@/components/PerformanceSummary";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
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

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Continuous Score Estimate</h1>
          <p className="mt-2 text-gray-600">
            Here is your assessment based on Qbank Performance. Check out your study recommendations below to optimize your study schedule.
          </p>
        </div>
        
        <div className="space-y-6">
          <PeerGroup />
          <PerformanceSummary />
          <TopicsList />
          <ProgressTracker />
        </div>
      </div>
    </div>
  );
};

export default Index;
