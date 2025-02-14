
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface PerformanceOverviewProps {
  score: number;
  targetScore: number;
  questionsTagged: number;
  totalQuestions: number;
  targetQuestions: number;
}

const PerformanceOverview = ({
  score,
  targetScore,
}: PerformanceOverviewProps) => {
  const scoreProgress = (score / targetScore) * 100;
  const targetsMetCount = [
    score >= targetScore,
  ].filter(Boolean).length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Overall Performance</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <Target className="h-5 w-5" />
          <span>{targetsMetCount} of 1 target met</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Your Score</span>
          <span className="font-medium">{score}%</span>
        </div>
        <Progress value={scoreProgress} className="h-2" />
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Target: {targetScore}%</span>
          <span>{Math.round(scoreProgress)}% complete</span>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceOverview;
