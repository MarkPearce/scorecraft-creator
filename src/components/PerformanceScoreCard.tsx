
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import PrototypeControls from "./PrototypeControls";
import PerformanceGraph from "./PerformanceGraph";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";

interface PerformanceScoreCardProps {
  initialScore?: number;
  targetScore?: number;
  onTargetScoreChange?: (score: number) => void;
  initialRange?: { min: number; max: number };
  showControls?: boolean;
  className?: string;
  title?: string;
  examStep?: 'step1' | 'step2';
  passingStandard?: number;
}

const PerformanceScoreCard = ({
  initialScore = 240,
  targetScore = 260,
  onTargetScoreChange,
  initialRange = { min: 180, max: 300 },
  showControls = true,
  className = "",
  title = "Performance Score",
  examStep = 'step2',
  passingStandard
}: PerformanceScoreCardProps) => {
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    setScore(initialScore);
  }, [initialScore]);

  const [range, setRange] = useState(initialRange);

  const handleRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    setRange(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  return (
    <Card className={`animate-fadeIn ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        {showControls && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Prototype Settings</span>
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Prototype Controls</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <PrototypeControls 
                  range={range}
                  targetScore={targetScore}
                  score={score}
                  onRangeChange={handleRangeChange}
                  onTargetScoreChange={(value) => onTargetScoreChange?.(value[0])}
                  onScoreChange={(value) => setScore(value[0])}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>

      <CardContent>
        <div className="w-full max-w-[1000px] mx-auto">
          <PerformanceGraph 
            score={score}
            targetScore={targetScore}
            range={range}
            examStep={examStep}
            passingStandard={passingStandard}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceScoreCard;
