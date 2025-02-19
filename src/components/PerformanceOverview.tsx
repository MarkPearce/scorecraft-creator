
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PerformanceOverviewProps {
  score: number;
  questionsTagged: number;
  totalQuestions: number;
}

const PerformanceOverview = ({
  score,
}: PerformanceOverviewProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-lato">Overall Performance</h2>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-600 font-lato">
          <span>Your Score</span>
          <span className="font-medium">{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
      </div>
    </Card>
  );
};

export default PerformanceOverview;
