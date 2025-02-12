
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopicsList from "@/components/TopicsList";

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

        <TopicsList />
      </div>
    </div>
  );
};

export default TopicBreakdown;
