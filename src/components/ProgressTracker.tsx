
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  
  const isAssessmentUnlocked = questionsAnswered >= 60;

  const getBarColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-600';
    if (progress >= 60) return 'bg-blue-600';
    return 'bg-gray-500';
  };

  const handleBoostAssessment = () => {
    setQuestionsAnswered(prev => Math.min(prev + 10, 100));
    setIsDialogOpen(false);
    toast({
      title: "Assessment completed",
      description: "You've answered 10 more questions!",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span>Questions in last 30 days</span>
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex gap-8">
            <div className="flex flex-col flex-grow">
              <div className="h-[116px] flex flex-col">
                <div className="flex-grow flex flex-col justify-end relative">
                  {/* Lock icon and tick mark container - absolute positioned at 60% */}
                  <div className="absolute left-[60%] top-0 -translate-x-1/2 flex flex-col items-center">
                    {isAssessmentUnlocked ? (
                      <div className="text-green-600">
                        <Unlock className="w-8 h-8" />
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <Lock className="w-8 h-8" />
                      </div>
                    )}
                    <div className="h-4 w-0.5 bg-gray-300 mt-2" />
                  </div>

                  {/* Label and progress bar container */}
                  <div className="mt-auto">
                    <span className="text-sm font-bold block mb-2">Continuous assessment</span>
                    <div className="h-4 w-full bg-gray-100 rounded-full border border-gray-300 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${getBarColor(questionsAnswered)}`}
                        style={{ width: `${questionsAnswered}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg h-[116px]">
              <div className="text-5xl font-bold text-gray-900">{questionsAnswered}</div>
              <div className="text-sm text-gray-500 mt-2">Questions completed</div>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              Boost assessment
            </Button>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start assessment boost</DialogTitle>
            </DialogHeader>
            <p className="py-4 text-gray-600">
              You'll be presented with 10 new questions to boost your progress. Ready to begin?
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBoostAssessment}>
                Start assessment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
