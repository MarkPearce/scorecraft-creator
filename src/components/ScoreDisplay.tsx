
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
    <div className="grid grid-cols-[1fr_140px] items-center gap-0.5">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
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
      </div>
      <div className="flex items-center justify-end gap-3">
        <span className="text-sm font-medium whitespace-nowrap">
          {isComplete ? (
            <span className="text-blue-600">{score}/{targetScore}%</span>
          ) : (
            <span className="text-gray-400">-/{targetScore}%</span>
          )}
        </span>
        <div className="w-8 flex items-center justify-center">
          {meetsTarget && isComplete && (
            <Star 
              className="w-8 h-8 text-[#F97316]" 
              fill="#FACC15" 
              stroke="#F97316"
              strokeWidth={1.5}
            />
          )}
          {(!meetsTarget || !isComplete) && (
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 transition-colors group p-0
                ${isComplete && !meetsTarget 
                  ? "bg-[#66BB6A] hover:bg-white border-[#66BB6A] hover:border-[#66BB6A]" 
                  : "border-gray-600 hover:bg-foreground hover:text-background"}`}
              onClick={(e) => {
                e.stopPropagation();
                // Add your practice questions navigation logic here
              }}
            >
              <BookOpenCheck 
                className={`h-6 w-6 
                  ${isComplete && !meetsTarget 
                    ? "text-white group-hover:text-[#66BB6A]" 
                    : "text-gray-600"}`}
                strokeWidth={1.5}
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
