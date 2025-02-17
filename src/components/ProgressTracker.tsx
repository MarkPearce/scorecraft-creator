import { Progress } from "@/components/ui/progress";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
const ProgressTracker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(45);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const isAssessmentUnlocked = questionsAnswered >= 60;
  const getBarColor = (progress: number) => {
    if (progress >= 60) return 'bg-green-600';
    return 'bg-gray-500';
  };
  const handleBoostAssessment = () => {
    setQuestionsAnswered(prev => Math.min(prev + 20, 100));
    setIsDialogOpen(false);
    toast({
      title: "Assessment completed",
      description: "You've answered 20 more questions!",
      duration: 3000
    });
  };
  return <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span>
            {isAssessmentUnlocked ? "Continuous assessment unlocked!" : "Unlock continuous assessment"}
          </span>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setQuestionsAnswered(prev => Math.max(prev - 10, 0))}>
              -10
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setQuestionsAnswered(prev => Math.min(prev + 10, 100))}>
              +10
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex gap-8">
            <div className="flex flex-col flex-grow">
              <div className="flex flex-col">
                <div className="flex-grow flex flex-col justify-end">
                  <div className="relative mb-4 mt-10">
                    <div className="flex items-end mb-2">
                      <div className="w-full">
                        <div className="relative">
                          <div className="h-4 w-full bg-gray-100 rounded-full border border-gray-300 overflow-hidden">
                            <div className={`h-full transition-all duration-500 ${getBarColor(questionsAnswered)}`} style={{
                            width: `${questionsAnswered}%`,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                          }} />
                          </div>
                          
                          <div className="absolute left-[60%] -translate-x-1/2 -top-[44px] flex flex-col items-center">
                            {isAssessmentUnlocked ? <div className="text-green-600 [&_svg]:size-8 mt-[1px]">
                                <Unlock />
                              </div> : <div className="text-gray-400 [&_svg]:size-8 mt-[1px]">
                                <Lock />
                              </div>}
                            <div className="h-6 w-0.5 bg-gray-300 -mt-[1px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Unlock continuous assessment by completing more than 60 questions.  The more questions you answer, the more accurate the assessment is.</div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg h-[116px]">
              <div className="text-5xl font-bold text-gray-900">{questionsAnswered}</div>
              <div className="text-sm text-gray-500 mt-2">Questions completed</div>
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <Button variant="outline" className="text-base" onClick={() => setIsDialogOpen(true)}>
              Boost assessment
            </Button>
            <Button disabled={!isAssessmentUnlocked} onClick={() => navigate('/report')} className="text-base font-medium">
              Start prototype
            </Button>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start assessment boost</DialogTitle>
            </DialogHeader>
            <p className="py-4 text-gray-600">
              You'll be presented with 20 new questions to boost your progress. Ready to begin?
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
    </Card>;
};
export default ProgressTracker;