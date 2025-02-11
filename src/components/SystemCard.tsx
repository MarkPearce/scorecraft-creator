
import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SystemCardProps {
  name: string;
  icon: JSX.Element;
  score: number;
  questionsTagged: number;
  totalQuestions: number;
  targetScore: number;
}

const SystemCard = ({ name, icon, score, questionsTagged, totalQuestions, targetScore }: SystemCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {questionsTagged} / {totalQuestions} questions
          </span>
          <span className="font-semibold text-blue-600">{score}%</span>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-fadeIn">
          <div className="relative">
            <Progress value={score} className="h-2" />
            <div 
              className="absolute top-0 h-2 w-0.5 bg-green-500"
              style={{ left: `${targetScore}%` }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Current Score</p>
              <p className="text-xl font-semibold text-blue-600">{score}%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Target Score</p>
              <p className="text-xl font-semibold text-green-600">{targetScore}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Questions Completed</p>
              <p className="text-xl font-semibold text-purple-600">{questionsTagged}/{totalQuestions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemCard;
