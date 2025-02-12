
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { SubjectHeader } from "./SubjectHeader";
import { ScoreDisplay } from "./ScoreDisplay";
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
  iconColor = "text-gray-500",
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
            <div onClick={(e) => e.stopPropagation()}>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-[#8A898C]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#8A898C]" />
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
