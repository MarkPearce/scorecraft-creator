
import { Star, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const getProgressColor = () => {
    return isComplete ? "bg-green-600" : "bg-gray-500";
  };

  const handleQuestionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    event?.stopPropagation?.();
    setIsDialogOpen(open);
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_180px] items-center gap-0.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-20 h-2 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <div
                className={`h-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
              {questionsCompleted}/{totalQuestions}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 flex-shrink-0">
          <span className="text-sm font-medium whitespace-nowrap flex-shrink-0">
            {isComplete ? (
              <span className="text-blue-600">{score}/{targetScore}%</span>
            ) : (
              <span className="text-gray-400">-/{targetScore}%</span>
            )}
          </span>
          <div className="w-8 flex items-center justify-center flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            {meetsTarget && isComplete && (
              <Star 
                className="w-8 h-8 text-yellow-600"
                fill="#f6bc56"
                stroke="#df9411"
                strokeWidth={1.5}
              />
            )}
            {(!meetsTarget || !isComplete) && (
              <Button
                variant="outline"
                size="icon"
                className={`h-8 w-8 transition-colors group p-0
                  ${isComplete && !meetsTarget 
                    ? "bg-green-600 hover:bg-green-700 border-green-600" 
                    : "border-gray-400 hover:bg-gray-100"}`}
                onClick={handleQuestionClick}
              >
                <BookOpenCheck 
                  className={`h-6 w-6 
                    ${isComplete && !meetsTarget 
                      ? "text-white" 
                      : "text-gray-600 group-hover:text-gray-800"}`}
                  strokeWidth={1.5}
                />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogTitle>Question Session</DialogTitle>
          <DialogDescription className="py-4">
            Ready to start your practice questions?
          </DialogDescription>
          <DialogClose asChild>
            <Button variant="default" className="w-full" onClick={(e) => e.stopPropagation()}>OK</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
