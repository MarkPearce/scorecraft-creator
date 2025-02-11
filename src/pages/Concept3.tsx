
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Concept3 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="p-8 animate-fadeIn">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-semibold text-gray-900">
              Exam readiness
            </h1>

            <div className="flex justify-center">
              <Lock className="w-16 h-16 text-amber-400" />
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full my-8" />

            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-xl font-medium text-gray-900">
                Exam date: June 24, 2025
              </p>

              <div className="space-y-4 text-gray-600">
                <p className="text-center">
                  You are currently at the 30th percentile compared to other learners with an exam date at the end of June. Follow{" "}
                  <Button 
                    variant="link" 
                    className="text-blue-600 px-1 font-medium h-auto"
                    onClick={() => navigate('/report')}
                  >
                    these
                  </Button>{" "}
                  learning recommendations to move up the percentile rank.
                </p>

                <p className="text-center">
                  On this percentile rank, learners usually end up scoring between 230-250 on a 3-digit-scale. Keep it up!
                </p>
              </div>

              <div className="pt-6">
                <Button 
                  className="w-full py-6 text-lg bg-[#06B6D4] hover:bg-[#06B6D4]/90"
                  onClick={() => navigate('/report')}
                >
                  View Learning Recommendations
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Concept3;
