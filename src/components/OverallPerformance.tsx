
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuestionSessionDialog from "./QuestionSessionDialog";
import { Pencil, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OverallPerformanceProps {
  yourScore: number;
  targetScore: number;
  questionsAnswered: number;
  examDate: string;
}

const OverallPerformance = ({
  yourScore,
  targetScore: initialTargetScore,
  questionsAnswered,
  examDate
}: OverallPerformanceProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [targetScore, setTargetScore] = useState(initialTargetScore);
  const [tempScore, setTempScore] = useState(initialTargetScore.toString());
  
  const totalQuestions = 720;
  const progressPercentage = questionsAnswered / totalQuestions * 100;

  const handleSave = () => {
    const newScore = parseInt(tempScore, 10);
    if (!isNaN(newScore) && newScore > 0) {
      setTargetScore(newScore);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempScore(targetScore.toString());
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return <>
      <Card>
        <CardHeader>
          <CardTitle className="font-lato">Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-8">
            <div>
              <div className="text-sm text-[#403E43] mb-2 font-lato">Assessment</div>
              <div className="text-4xl font-bold text-gray-600 font-lato">{yourScore}</div>
            </div>
            <div className="min-w-[200px]">
              <div className="text-sm text-[#403E43] mb-2 font-lato">Target Score</div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <div className="flex items-end gap-3">
                    <div className="w-[120px]">
                      <Input
                        type="number"
                        value={tempScore}
                        onChange={(e) => setTempScore(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="text-4xl font-bold text-gray-600 font-lato h-12 px-0"
                        autoFocus
                        style={{ fontSize: '36px' }}
                      />
                    </div>
                    <button onClick={handleSave} className="text-green-600 hover:text-green-700 pb-1">
                      <Check className="h-5 w-5" />
                    </button>
                    <button onClick={handleCancel} className="text-red-600 hover:text-red-700 pb-1">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-end gap-3">
                    <div className="w-[120px] text-4xl font-bold text-gray-600 font-lato">{targetScore}</div>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-gray-400 hover:text-gray-600 pb-1"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
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
              <Button variant="outline" className="font-lato" onClick={() => setIsDialogOpen(true)}>
                Continue questions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <QuestionSessionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>;
};

export default OverallPerformance;
