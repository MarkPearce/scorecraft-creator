import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface SubjectProgressProps {
  subject: string;
  questionsCompleted: number;
  totalQuestions: number;
  targetQuestions: number;
  score: number;
  icon: LucideIcon;
}

const SubjectProgress = ({
  subject,
  questionsCompleted,
  totalQuestions,
  targetQuestions,
  score,
  icon
}: SubjectProgressProps) => {
  const questionsProgress = (questionsCompleted / targetQuestions) * 100;
  const scoreProgress = (score / 100) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">{icon} {subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600 mb-2">
          {questionsCompleted} / {totalQuestions} Questions Completed
        </div>
        <Progress value={questionsProgress} className="h-2 mb-1" />
        <div className="text-xs text-gray-500 text-right">
          Target: {targetQuestions} ({Math.round(questionsProgress)}% complete)
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Score: {score}%
        </div>
        <Progress value={scoreProgress} className="h-2 mb-1" />
        <div className="text-xs text-gray-500 text-right">
          {Math.round(scoreProgress)}% complete
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectProgress;
