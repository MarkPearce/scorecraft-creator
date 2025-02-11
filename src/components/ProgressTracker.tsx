
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ProgressTracker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(30);
  const { toast } = useToast();
  
  const isAssessmentUnlocked = questionsAnswered >= 50;
  const isInsightsUnlocked = questionsAnswered >= 75;

  const getBarColor = (progress: number) => {
    if (progress >= 75) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-[#F97316]'; // Changed to orange for better contrast
    return 'bg-primary';
  };

  const handleBoostAssessment = () => {
    setQuestionsAnswered(prev => Math.min(prev + 10, 100));
    setIsDialogOpen(false);
    toast({
      title: "Assessment Completed",
      description: "You've answered 10 more questions!",
      duration: 3000,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Questions in last 30 days</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setQuestionsAnswered(prev => Math.max(prev - 10, 0))}
          >
            -10
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setQuestionsAnswered(prev => Math.min(prev + 10, 100))}
          >
            +10
          </Button>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-4 h-[200px] bg-gray-100 rounded-full relative">
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-500 rounded-full ${getBarColor(questionsAnswered)}`}
            style={{ height: `${questionsAnswered}%` }}
          />
          
          {/* Unlock markers */}
          <div className="absolute w-28 -right-32 top-[25%] flex items-center gap-2">
            <div className="h-0.5 w-4 bg-gray-300" />
            {isInsightsUnlocked ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <Unlock className="w-4 h-4" />
                <span className="text-sm">Insights</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Insights</span>
              </div>
            )}
          </div>

          <div className="absolute w-28 -right-32 top-[50%] flex items-center gap-2">
            <div className="h-0.5 w-4 bg-gray-300" />
            {isAssessmentUnlocked ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <Unlock className="w-4 h-4" />
                <span className="text-sm">Continuous Assessment</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Continuous Assessment</span>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard style readout */}
        <div className="ml-auto flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
          <div className="text-5xl font-bold text-gray-800">{questionsAnswered}</div>
          <div className="text-sm text-gray-500 mt-2">Questions Completed</div>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          Boost Assessment
        </Button>
      </div>

      {/* Boost Assessment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Assessment Boost</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            You'll be presented with 10 new questions to boost your progress. Ready to begin?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBoostAssessment}>
              Start Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgressTracker;
