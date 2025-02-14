
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PerformanceGraph from "@/components/PerformanceGraph";

const Concept1 = () => {
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

        <div className="flex justify-center">
          <PerformanceGraph 
            score={240}
            targetScore={260}
            range={{ min: 180, max: 300 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Concept1;
