
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PerformanceTrackingContainer from "@/components/PerformanceTrackingContainer";

const Concept1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <PerformanceTrackingContainer />
      </div>
    </div>
  );
};

export default Concept1;
