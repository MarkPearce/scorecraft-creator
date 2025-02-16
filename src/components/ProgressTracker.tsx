
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
              <div className="relative">
                <div className="h-4 w-full bg-gray-100 rounded-full">
                  <div 
                    className={`absolute left-0 top-0 h-4 transition-all duration-500 rounded-full ${getBarColor(questionsAnswered)}`}
                    style={{ width: `${questionsAnswered}%` }}
                  />
                  {/* Vertical line at 60% */}
                  <div className="absolute left-[60%] top-4 h-8 w-0.5 bg-gray-300" />
                </div>

                <div className="absolute -bottom-16 left-[60%] -translate-x-1/2 flex items-center gap-2">
                  {isAssessmentUnlocked ? (
                    <div className="flex flex-col items-center text-green-600">
                      <Unlock className="w-12 h-12" />
                      <span className="text-sm whitespace-nowrap mt-2">Continuous assessment</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <Lock className="w-12 h-12" />
                      <span className="text-sm whitespace-nowrap mt-2">Continuous assessment</span>
                    </div>
                  )}
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
