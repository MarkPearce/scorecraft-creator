
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { SubjectHeader } from "./SubjectHeader";
import ScoreDisplay from "./ScoreDisplay"; // Fixed: Changed from named import to default import
import { StudyMaterials } from "./StudyMaterials";
import { getTargetScore } from "@/utils/subjectUtils";

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
  icon,
  iconColor = "text-gray-500", // Updated to use new gray-500 (tertiary text)
  examWeight
}: SubjectProgressProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const progressPercentage = (questionsCompleted / totalQuestions) * 100;
  const isComplete = questionsCompleted === totalQuestions;
  const targetScore = getTargetScore(examWeight);
  const meetsTarget = score >= targetScore;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleChevronClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="animate-fadeIn">
      <div
        onClick={handleClick}
        className="border rounded-lg p-4 hover:border-blue-200 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <SubjectHeader 
            subject={subject}
            examWeight={examWeight}
            icon={icon}
            iconColor={iconColor}
          />
          <div className="flex items-center space-x-4">
            <ScoreDisplay
              questionsCompleted={questionsCompleted}
              totalQuestions={totalQuestions}
              score={score}
              targetScore={targetScore}
              isComplete={isComplete}
              meetsTarget={meetsTarget}
              progressPercentage={progressPercentage}
            />
            <div onClick={handleChevronClick}>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500" /> // Updated to use new gray-500
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" /> // Updated to use new gray-500
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <StudyMaterials
            subject={subject}
            isComplete={isComplete}
            score={score}
          />
        )}
      </div>
    </Card>
  );
};

export default SubjectProgress;
