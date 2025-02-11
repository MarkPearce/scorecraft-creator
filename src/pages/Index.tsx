
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScoreDistribution from "@/components/ScoreDistribution";
import SystemsBreakdown from "@/components/SystemsBreakdown";

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

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">USMLE Step 1 Performance</h1>
          <p className="mt-2 text-gray-600">
            Track your progress and identify areas for improvement
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-600">Your Score</span>
                <span className="text-3xl font-bold text-blue-600">238</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-600">Questions Tagged</span>
                <span className="text-3xl font-bold text-green-600">1,459</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-sm text-gray-600">Target Score</span>
                <span className="text-3xl font-bold text-purple-600">240</span>
              </div>
            </div>
          </div>
          
          <ScoreDistribution />
          <SystemsBreakdown />
        </div>
      </div>
    </div>
  );
};

export default Index;
