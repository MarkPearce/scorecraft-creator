
import { Star, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScoreDisplayProps {
  questionsCompleted: number;
  totalQuestions: number;
  score: number;
  targetScore: number;
  isComplete: boolean;
  meetsTarget: boolean;
  progressPercentage: number;
}

export const ScoreDisplay = ({
  questionsCompleted,
  totalQuestions,
  score,
  targetScore,
  isComplete,
  meetsTarget,
  progressPercentage
}: ScoreDisplayProps) => {
  const getProgressColor = () => {
    return isComplete ? "bg-[#66BB6A]" : "bg-[#8A898C]";
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {meetsTarget && isComplete && (
          <Star 
            className="w-5 h-5 text-[#F97316] mr-1" 
            fill="#FACC15" 
            stroke="#F97316"
            strokeWidth={1.5}
          />
        )}
        {(!meetsTarget || !isComplete) && (
          <Button
            variant="outline"
            size="icon"
            className={`h-7 w-7 -ml-1 transition-colors group
              ${isComplete && !meetsTarget 
                ? "bg-[#66BB6A] hover:bg-white border-[#66BB6A] hover:border-[#66BB6A]" 
                : "border-gray-600 hover:bg-foreground hover:text-background"}`}
            onClick={(e) => {
              e.stopPropagation();
              // Add your practice questions navigation logic here
            }}
          >
            <BookOpenCheck 
              className={`h-4 w-4 
                ${isComplete && !meetsTarget 
                  ? "text-white group-hover:text-[#66BB6A]" 
                  : "text-gray-600"}`}
              fill="currentColor"
              strokeWidth={1.5}
            />
          </Button>
        )}
        <div className="w-20 h-2 rounded-full overflow-hidden bg-gray-100">
          <div
            className={`h-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-sm text-[#8A898C]">
          {questionsCompleted}/{totalQuestions}
        </span>
      </div>
      <span className="text-sm font-medium">
        {isComplete ? (
          <span className="text-blue-600">{score}/{targetScore}%</span>
        ) : (
          <span className="text-gray-400">-/{targetScore}%</span>
        )}
      </span>
    </div>
  );
};
