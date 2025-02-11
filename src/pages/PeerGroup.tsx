
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScoreDistribution from "@/components/ScoreDistribution";
import ScoreBox from "@/components/ScoreBox";

const PeerGroup = () => {
  const navigate = useNavigate();
  const studentScore = 250; // Using the same score as in ScoreDistribution

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
          <h1 className="text-3xl font-bold text-gray-900">Peer Group Comparison</h1>
          <p className="mt-2 text-gray-600">
            Compare your performance with different peer groups to better understand your standing
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <ScoreBox score={studentScore} position={0.5} />
          </div>
          <ScoreDistribution />
        </div>
      </div>
    </div>
  );
};

export default PeerGroup;
