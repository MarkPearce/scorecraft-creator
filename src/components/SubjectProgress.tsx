
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface SubjectProgressProps {
  subject: string;
  questionsCompleted: number;
  totalQuestions: number;
  targetQuestions: number;
  score: number;
  icon: LucideIcon;
  iconColor?: string;
}

const SubjectProgress = ({
  subject,
  questionsCompleted,
  totalQuestions,
  targetQuestions,
  score,
  icon: Icon,
  iconColor = "text-gray-500"
}: SubjectProgressProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            <span className="text-sm text-gray-600">
              {questionsCompleted}/{totalQuestions} questions
            </span>
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
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Current Score</div>
                <div className="text-xl font-bold text-blue-600">{score}%</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Target Score</div>
                <div className="text-xl font-bold text-green-600">80%</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Questions Done</div>
                <div className="text-xl font-bold text-purple-600">
                  {questionsCompleted}/{totalQuestions}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                Study Materials
              </button>
              <button className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
                Practice Questions
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubjectProgress;
