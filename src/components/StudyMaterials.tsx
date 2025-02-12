
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleTitles } from "@/utils/subjectUtils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface StudyMaterialsProps {
  subject: string;
  isComplete: boolean;
  score: number;
}

export const StudyMaterials = ({ subject, isComplete, score }: StudyMaterialsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePracticeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return (
    <>
      <div className="mt-4 pl-8 animate-slide-down">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <div className="grid auto-cols-min grid-flow-col gap-4 h-full">
                <div className="flex flex-col w-[120px]">
                  <div className="text-sm font-medium text-[#403E43] mb-1 text-center whitespace-nowrap">Current Score</div>
                  <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-blue-50 border-blue-500' : 'bg-gray-100 border-gray-300'}`}>
                    {isComplete && (
                      <div className="text-2xl font-bold text-blue-600">{score}%</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-[120px]">
                  <div className="text-sm font-medium text-[#403E43] mb-1 text-center whitespace-nowrap">Target Score</div>
                  <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-purple-50 border-purple-500' : 'bg-gray-100 border-gray-300'}`}>
                    {isComplete && (
                      <div className="text-2xl font-bold text-purple-600">80%</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-[120px]">
                  <div className="text-sm font-medium text-[#403E43] mb-1 text-center whitespace-nowrap">Percentile</div>
                  <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-green-50 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                    {isComplete && (
                      <div className="text-2xl font-bold text-green-600">75th</div>
                    )}
                  </div>
                </div>
              </div>
              {!isComplete && (
                <div className="mt-2 text-sm text-gray-500 text-center">
                  Complete 50 questions to activate the assessment
                </div>
              )}
            </div>
            <div className="col-span-6">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-[#403E43] mb-1">Study Materials</div>
                <div className="space-y-1">
                  {getArticleTitles(subject).map((title, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Newspaper className="w-4 h-4" />
                      <span>{title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePracticeClick}
            >
              Practice Questions
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogTitle>Question Session</DialogTitle>
          <DialogDescription className="py-4">
            Ready to start your practice questions?
          </DialogDescription>
          <DialogClose asChild>
            <Button variant="default" className="w-full">OK</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
