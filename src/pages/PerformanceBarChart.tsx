
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PrototypeControls from "@/components/PrototypeControls";
import PerformanceGraph from "@/components/PerformanceGraph";
import PerformanceScore from "@/components/PerformanceScore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const getScoreSegment = (score: number, range: { min: number; max: number }) => {
  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  if (score >= range.max - segmentSize) return 5; // Excellent
  if (score >= range.max - (segmentSize * 2)) return 4; // Strong
  if (score >= range.max - (segmentSize * 3)) return 3; // Developing
  if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
  return 1; // Critical
};

const PerformanceBarChart = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(240);
  const [range, setRange] = useState({ min: 180, max: 300 });
  const [targetScore, setTargetScore] = useState(260);

  const getScoreColor = (score: number) => {
    const segment = getScoreSegment(score, range);
    switch (segment) {
      case 5: return "bg-[#019444]";
      case 4: return "bg-[#8DC641]";
      case 3: return "bg-yellow-500";
      case 2: return "bg-[#F46523]";
      default: return "bg-[#ED1B24]";
    }
  };

  const getBackgroundColor = (score: number) => {
    const segment = getScoreSegment(score, range);
    switch (segment) {
      case 5: return "bg-[#019444]/15";
      case 4: return "bg-[#8DC641]/15";
      case 3: return "bg-yellow-500/15";
      case 2: return "bg-[#F46523]/15";
      default: return "bg-[#ED1B24]/15";
    }
  };

  const getTextColor = (score: number) => {
    const segment = getScoreSegment(score, range);
    switch (segment) {
      case 5: return "text-[#019444]";
      case 4: return "text-[#8DC641]";
      case 3: return "text-yellow-500";
      case 2: return "text-[#F46523]";
      default: return "text-[#ED1B24]";
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 font-playfair">Performance Score</h2>
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
          </div>

          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center pl-[200px]">
                <PerformanceGraph 
                  score={score}
                  targetScore={targetScore}
                  range={range}
                />
              </div>

              <div className="flex items-center justify-center">
                <PerformanceScore 
                  score={score}
                  range={range}
                  getBackgroundColor={getBackgroundColor}
                  getTextColor={getTextColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceBarChart;
