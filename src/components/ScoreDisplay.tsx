
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";
import { getBackgroundColor, getScoreColor, getScoreSegment } from "@/utils/scoreUtils";

interface ScoreDisplayProps {
  questionsCompleted: number;
  totalQuestions: number;
  score: number;
  targetScore: number;
  isComplete: boolean;
  meetsTarget: boolean;
  progressPercentage: number;
}

const ScoreDisplay = ({ 
  questionsCompleted,
  totalQuestions,
  score,
  targetScore,
  isComplete,
  meetsTarget,
  progressPercentage
}: ScoreDisplayProps) => {
  const range = { min: 0, max: 100 }; // Define range for score calculations
  
  const getFaceIcon = (score: number) => {
    const segment = getScoreSegment(score, range);
    const colorClass = getScoreColor(score, range);
    
    switch (segment) {
      case 5: return <Laugh className={`w-6 h-6 ${colorClass}`} />;
      case 4: return <Smile className={`w-6 h-6 ${colorClass}`} />;
      case 3: return <Meh className={`w-6 h-6 ${colorClass}`} />;
      case 2: return <Frown className={`w-6 h-6 ${colorClass}`} />;
      default: return <Angry className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-600">
        {questionsCompleted}/{totalQuestions}
      </div>
      <div className="w-20 bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-full rounded-full ${
            isComplete 
              ? meetsTarget 
                ? 'bg-green-500' 
                : 'bg-yellow-500'
              : 'bg-blue-500'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex items-center space-x-1">
        {getFaceIcon(score)}
        <span className={`text-sm ${getScoreColor(score, range)}`}>
          {score}%
        </span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
