import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuestionSessionDialog from "./QuestionSessionDialog";
import { Pencil, X, Check, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
interface OverallPerformanceProps {
  yourScore: number;
  targetScore: number;
  onTargetScoreChange: (score: number) => void;
  questionsAnswered: number;
  examDate: string;
}
const OverallPerformance = ({
  yourScore,
  targetScore,
  onTargetScoreChange,
  questionsAnswered,
  examDate: initialExamDate
}: OverallPerformanceProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempScore, setTempScore] = useState(targetScore.toString());
  const [examDate, setExamDate] = useState(initialExamDate);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const totalQuestions = 720;
  const progressPercentage = questionsAnswered / totalQuestions * 100;
  const handleSave = () => {
    const newScore = parseInt(tempScore, 10);
    if (!isNaN(newScore) && newScore >= 0 && newScore <= 300) {
      onTargetScoreChange(newScore);
      setIsEditing(false);
    } else {
      // Reset to previous valid value if input is invalid
      setTempScore(targetScore.toString());
      setIsEditing(false);
    }
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);

    // Allow empty string for typing purposes
    if (value === '') {
      setTempScore(value);
      return;
    }

    // Only update if it's a number and within range
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 300) {
      setTempScore(value);
    }
  };
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setExamDate(format(date, 'MMM d, yyyy'));
      setIsDatePickerOpen(false);
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
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm text-[#403E43] font-lato">Target Score</div>
                {!isEditing && <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-gray-600">
                    <Pencil className="h-4 w-4" />
                  </button>}
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? <div className="flex items-end gap-3">
                    <div className="w-[120px]">
                      <Input type="number" value={tempScore} onChange={handleInputChange} onKeyDown={handleKeyDown} className="text-4xl font-bold text-gray-600 font-lato h-12 px-0" autoFocus min={0} max={300} style={{
                    fontSize: '36px'
                  }} />
                    </div>
                    <button onClick={handleSave} className="text-green-600 hover:text-green-700 pb-1">
                      <Check className="h-5 w-5" />
                    </button>
                    <button onClick={handleCancel} className="text-red-600 hover:text-red-700 pb-1">
                      <X className="h-5 w-5" />
                    </button>
                  </div> : <div className="w-[120px] text-4xl font-bold text-gray-600 font-lato">{targetScore}</div>}
              </div>
            </div>
            <div>
              <div className="text-sm text-[#403E43] mb-2 font-lato">Questions Answered</div>
              <div className="text-4xl font-bold text-gray-600 font-lato">{questionsAnswered}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm text-[#403E43] font-lato">Exam Date</div>
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" onSelect={handleDateSelect} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-4xl font-bold text-gray-600 font-lato">{examDate}</div>
            </div>
          </div>
          
          
        </CardContent>
      </Card>

      <QuestionSessionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>;
};
export default OverallPerformance;