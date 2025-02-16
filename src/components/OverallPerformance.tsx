
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OverallPerformanceProps {
  yourScore: number;
  targetScore: number;
  questionsAnswered: number;
  examDate: string;
}

const OverallPerformance = ({
  yourScore,
  targetScore,
  questionsAnswered,
  examDate,
}: OverallPerformanceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-8">
          <div>
            <div className="text-sm text-[#403E43] mb-2">Your Score</div>
            <div className="text-4xl font-bold text-gray-600">{yourScore}</div>
          </div>
          <div>
            <div className="text-sm text-[#403E43] mb-2">Target Score</div>
            <div className="text-4xl font-bold text-gray-600">{targetScore}</div>
          </div>
          <div>
            <div className="text-sm text-[#403E43] mb-2">Questions Answered</div>
            <div className="text-4xl font-bold text-gray-600">{questionsAnswered}</div>
          </div>
          <div>
            <div className="text-sm text-[#403E43] mb-2">Exam Date</div>
            <div className="text-4xl font-bold text-gray-600">{examDate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallPerformance;
