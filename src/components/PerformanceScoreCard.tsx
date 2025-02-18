
import { Settings } from "lucide-react";
import { useState } from "react";
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
  const [range, setRange] = useState(initialRange);

  const getScoreSegment = (score: number) => {
    const totalRange = range.max - range.min;
    const segmentSize = totalRange / 5;
    
    if (score >= range.max - segmentSize) return 5;
    if (score >= range.max - (segmentSize * 2)) return 4;
    if (score >= range.max - (segmentSize * 3)) return 3;
    if (score >= range.max - (segmentSize * 4)) return 2;
    return 1;
  };

  const getScoreColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "bg-[#019444]";
      case 4: return "bg-[#8DC641]";
      case 3: return "bg-yellow-500";
      case 2: return "bg-[#F46523]";
      default: return "bg-[#ED1B24]";
    }
  };

  const getBackgroundColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "bg-[#019444]/15";
      case 4: return "bg-[#8DC641]/15";
      case 3: return "bg-yellow-500/15";
      case 2: return "bg-[#F46523]/15";
      default: return "bg-[#ED1B24]/15";
    }
  };

  const getTextColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "text-[#019444]";
      case 4: return "text-[#8DC641]";
      case 3: return "text-yellow-500";
      case 2: return "text-[#F46523]";
      default: return "text-[#ED1B24]";
    }
  };

  const getFaceIcon = (score: number) => {
    const segment = getScoreSegment(score);
    const colorClass = getTextColor(score);
    
    switch (segment) {
      case 5: return <Laugh className={`w-16 h-16 ${colorClass}`} />;
      case 4: return <Smile className={`w-16 h-16 ${colorClass}`} />;
      case 3: return <Meh className={`w-16 h-16 ${colorClass}`} />;
      case 2: return <Frown className={`w-16 h-16 ${colorClass}`} />;
      default: return <Angry className={`w-16 h-16 ${colorClass}`} />;
    }
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
            onTargetScoreChange={onTargetScoreChange}
            examStep={examStep}
            passingStandard={passingStandard}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceScoreCard;
