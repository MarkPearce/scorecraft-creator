
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

interface PerformanceScoreCardProps {
  examStep: 'step1' | 'step2';
  onTargetScoreChange?: (score: number) => void;
  showControls?: boolean;
  className?: string;
  title?: string;
}

const STEP_DEFAULTS = {
  step1: {
    initialScore: 200,
    range: { min: 120, max: 300 },
    passingStandard: 196
  },
  step2: {
    initialScore: 245,
    range: { min: 180, max: 300 },
    passingStandard: undefined
  }
};

const PerformanceScoreCard = ({
  examStep,
  onTargetScoreChange,
  showControls = true,
  className = "",
  title = "Performance Score",
}: PerformanceScoreCardProps) => {
  const defaults = STEP_DEFAULTS[examStep];
  const [score, setScore] = useState(defaults.initialScore);
  const [targetScore, setTargetScore] = useState(260);
  const [range, setRange] = useState(defaults.range);

  useEffect(() => {
    const newDefaults = STEP_DEFAULTS[examStep];
    setScore(newDefaults.initialScore);
    setRange(newDefaults.range);
  }, [examStep]);

  const handleTargetScoreChange = (value: number) => {
    setTargetScore(value);
    onTargetScoreChange?.(value);
  };

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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5">
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
                  onTargetScoreChange={(value) => handleTargetScoreChange(value[0])}
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
            passingStandard={defaults.passingStandard}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceScoreCard;
