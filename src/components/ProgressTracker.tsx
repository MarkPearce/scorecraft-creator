
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock } from "lucide-react";

const ProgressTracker = () => {
  // Mock data - this would typically come from props or an API
  const questionsAnswered = 65; // out of 100
  const isAssessmentUnlocked = questionsAnswered >= 50;
  const isInsightsUnlocked = questionsAnswered >= 75;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Boost Assessment</h2>
      <div className="flex gap-6">
        <div className="w-4 h-[200px] bg-gray-100 rounded-full relative">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-500 rounded-full"
            style={{ height: `${questionsAnswered}%` }}
          />
          
          {/* Unlock markers */}
          <div className="absolute w-28 -right-32 top-[25%] flex items-center gap-2">
            <div className="h-0.5 w-4 bg-gray-300" />
            {isInsightsUnlocked ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <Unlock className="w-4 h-4" />
                <span className="text-sm">Insights</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Insights</span>
              </div>
            )}
          </div>

          <div className="absolute w-28 -right-32 top-[50%] flex items-center gap-2">
            <div className="h-0.5 w-4 bg-gray-300" />
            {isAssessmentUnlocked ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <Unlock className="w-4 h-4" />
                <span className="text-sm">Continuous Assessment</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Continuous Assessment</span>
              </div>
            )}
          </div>

          {/* Current progress marker */}
          <div className="absolute w-28 -right-32 bottom-0 flex items-center gap-2">
            <div className="h-0.5 w-4 bg-gray-300" />
            <span className="text-sm text-gray-600">{questionsAnswered} Questions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
