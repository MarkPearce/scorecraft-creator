
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

interface OverallPerformanceProps {
  questionsAnswered: number;
  examDate: string;
}

const OverallPerformance = ({
  questionsAnswered,
  examDate: initialExamDate
}: OverallPerformanceProps) => {
  const [examDate, setExamDate] = useState(initialExamDate);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setExamDate(format(date, 'MMM d, yyyy'));
      setIsDatePickerOpen(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex gap-8">
          <div className="flex-1">
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
          <div className="flex-1">
            <div className="text-sm text-[#403E43] mb-2 font-lato">Questions Answered</div>
            <div className="text-4xl font-bold text-gray-600 font-lato">{questionsAnswered}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallPerformance;
