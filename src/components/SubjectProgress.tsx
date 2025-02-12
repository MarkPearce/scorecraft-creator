import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, LucideIcon, Newspaper } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface SubjectProgressProps {
  subject: string;
  questionsCompleted: number;
  totalQuestions: number;
  targetQuestions: number;
  score: number;
  icon: LucideIcon;
  iconColor?: string;
  examWeight?: string;
}

const SubjectProgress = ({
  subject,
  questionsCompleted,
  totalQuestions,
  targetQuestions,
  score,
  icon: Icon,
  iconColor = "text-gray-500",
  examWeight
}: SubjectProgressProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = (questionsCompleted / totalQuestions) * 100;
  
  // Determine if system is complete
  const isComplete = questionsCompleted === 50 && totalQuestions === 50;
  
  // Determine progress bar color - medium grey or medium green
  const getProgressColor = () => {
    // Medium green only when exactly 50/50 questions are completed
    if (isComplete) {
      return "bg-[#66BB6A]"; // Medium green for completed subjects
    }
    return "bg-[#8A898C]"; // Medium grey for all others
  };

  return (
    <Card className="animate-fadeIn">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="border rounded-lg p-4 hover:border-blue-200 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <span className="font-medium">{subject}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 rounded-full overflow-hidden bg-gray-100">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor()}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {questionsCompleted}/{totalQuestions}
              </span>
            </div>
            <span className="text-sm font-medium text-blue-600">
              {score}%
            </span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4 pl-8 space-y-4 animate-fadeIn">
            {examWeight && (
              <div className="text-xs text-gray-500">
                Exam weight: {examWeight}%
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              <div className={`px-2.5 py-1.5 rounded-lg border ${isComplete ? 'bg-blue-50 border-blue-600' : 'bg-gray-100 border-gray-300'}`}>
                <div className="text-sm text-gray-600">Current Score</div>
                {isComplete && (
                  <div className="text-lg font-bold text-blue-600">{score}%</div>
                )}
              </div>
              <div className={`px-2.5 py-1.5 rounded-lg border ${isComplete ? 'bg-green-50 border-green-600' : 'bg-gray-100 border-gray-300'}`}>
                <div className="text-sm text-gray-600">Target Score</div>
                {isComplete && (
                  <div className="text-lg font-bold text-green-600">80%</div>
                )}
              </div>
              <div className={`px-2.5 py-1.5 rounded-lg border ${isComplete ? 'bg-purple-50 border-purple-600' : 'bg-gray-100 border-gray-300'}`}>
                <div className="text-sm text-gray-600">Percentile</div>
                {isComplete && (
                  <div className="text-lg font-bold text-purple-600">
                    75th
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col space-y-2">
                <div className="text-sm font-medium text-gray-600 mb-1">Study Materials:</div>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Overview & Fundamentals</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Clinical Manifestations</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Treatment Guidelines</span>
                </a>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  Practice Questions
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubjectProgress;
