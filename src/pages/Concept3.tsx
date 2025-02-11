
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import TopicsList from "@/components/TopicsList";
import { PercentileDisplay } from "@/components/PercentileDisplay";

const Concept3 = () => {
  const navigate = useNavigate();
  const currentPercentile = 30;

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

        <Card className="p-8 animate-fadeIn mb-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-semibold text-gray-900">
              Exam readiness
            </h1>

            <div className="flex justify-center">
              <Lock className="w-16 h-16 text-amber-400" />
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full" />

            <div className="space-y-6 max-w-4xl mx-auto">
              <p className="text-xl font-medium text-gray-900">
                Exam date: June 24, 2025
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-left text-gray-600">
                  <p>
                    You are currently at the 30<sup>th</sup> percentile compared to other learners with an exam date at the end of June. Follow the recommendations below to improve your knowledge.
                  </p>

                  <p>
                    On this percentile rank, learners usually end up scoring <span className="font-bold">230-250 on a 3-digit-scale</span>. Keep it up!
                  </p>
                </div>
                
                <div>
                  <PercentileDisplay percentile={currentPercentile} />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <TopicsList />
      </div>
    </div>
  );
};

export default Concept3;
