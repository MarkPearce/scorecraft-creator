
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

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
  const totalQuestions = 720;
  const progressPercentage = (questionsAnswered / totalQuestions) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-lato">Overall Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-8">
          <div>
            <div className="text-sm text-[#403E43] mb-2 font-lato">Predicted Score</div>
            <div className="text-4xl font-bold text-gray-600 font-lato">{yourScore}</div>
          </div>
          <div>
            <div className="text-sm text-[#403E43] mb-2 font-lato">Target Score</div>
            <div className="text-4xl font-bold text-gray-600 font-lato">{targetScore}</div>
          </div>
          <div>
            <div className="text-sm text-[#403E43] mb-2 font-lato">Questions Answered</div>
            <div className="text-4xl font-bold text-gray-600 font-lato">{questionsAnswered}</div>
          </div>
          <div>
            <div className="text-sm text-[#403E43] mb-2 font-lato">Exam Date</div>
            <div className="text-4xl font-bold text-gray-600 font-lato">{examDate}</div>
          </div>
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-sm text-[#403E43] font-lato">
            <span>Question count</span>
            <span>{questionsAnswered}/{totalQuestions}</span>
          </div>
          <Progress value={progressPercentage} className="h-4" />
          <div className="flex justify-between items-center mt-6 pt-4">
            <span className="text-base text-gray-600 font-lato">Complete the recommended question set to reach your goal</span>
            <Button variant="outline" className="font-lato">Continue questions</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallPerformance;
