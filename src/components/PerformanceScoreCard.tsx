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
  initialTargetScore?: number;
  initialRange?: { min: number; max: number };
  showControls?: boolean;
  className?: string;
  title?: string;
}

const PerformanceScoreCard = ({
  initialScore = 240,
  initialTargetScore = 260,
  initialRange = { min: 180, max: 300 },
  showControls = true,
  className = "",
  title = "Performance Score"
}: PerformanceScoreCardProps) => {
  const [score, setScore] = useState(initialScore);
  const [range, setRange] = useState(initialRange);
  const [targetScore, setTargetScore] = useState(initialTargetScore);

  const getScoreSegment = (score: number) => {
    const totalRange = range.max - range.min;
    const segmentSize = totalRange / 5;
    
    if (score >= range.max - segmentSize) return 5; // Excellent
    if (score >= range.max - (segmentSize * 2)) return 4; // Strong
    if (score >= range.max - (segmentSize * 3)) return 3; // Developing
    if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
    return 1; // Critical
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
        <CardTitle className="text-2xl font-bold text-gray-900 font-playfair">{title}</CardTitle>
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
                <DialogTitle className="font-playfair">Prototype Controls</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <PrototypeControls 
                  range={range}
                  targetScore={targetScore}
                  score={score}
                  onRangeChange={handleRangeChange}
                  onTargetScoreChange={(value) => setTargetScore(value[0])}
                  onScoreChange={(value) => setScore(value[0])}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
          <PerformanceGraph 
            score={score}
            targetScore={targetScore}
            range={range}
          />
          
          <div className={`${getBackgroundColor(score)} p-6 rounded-lg w-full max-w-[280px]`}>
            <div className="flex items-center gap-6 justify-center">
              {getFaceIcon(score)}
              <div className="text-center">
                <div className={`text-6xl font-bold ${getTextColor(score)} font-playfair`}>{score}</div>
                <div className="text-gray-500 mt-2 font-playfair">
                  RANGE {range.min}-{range.max}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceScoreCard;
