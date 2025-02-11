import { Button } from "@/components/ui/button";
import { ArrowLeft, Angry, Frown, Meh, Smile, Laugh } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PrototypeControls from "@/components/PrototypeControls";
import PerformanceGraph from "@/components/PerformanceGraph";

const PerformanceBarChart = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(249);
  const [range, setRange] = useState({ min: 241, max: 257 });
  const [targetScore, setTargetScore] = useState(249);

  const getScoreSegment = (score: number) => {
    const totalRange = range.max - range.min;
    const segmentSize = totalRange / 5;
    
    if (score >= range.max - segmentSize) return 5; // Excellent
    if (score >= range.max - (segmentSize * 2)) return 4; // Strong
    if (score >= range.max - (segmentSize * 3)) return 3; // Developing
    if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
    return 1; // Critical
  };

  const getScoreLevelName = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "Excellent";
      case 4: return "Strong";
      case 3: return "Developing";
      case 2: return "Needs Work";
      default: return "Critical";
    }
  };

  const getScoreColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "bg-[#019444]";
      case 4: return "bg-[#8DC641]";
      case 3: return "bg-[#FFDD19]";
      case 2: return "bg-[#F46523]";
      default: return "bg-[#ED1B24]";
    }
  };

  const getBackgroundColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "bg-[#019444]/15";
      case 4: return "bg-[#8DC641]/15";
      case 3: return "bg-[#FFDD19]/15";
      case 2: return "bg-[#F46523]/15";
      default: return "bg-[#ED1B24]/15";
    }
  };

  const getTextColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "text-[#019444]";
      case 4: return "text-[#8DC641]";
      case 3: return "text-[#FFDD19]";
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Performance Score</h1>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bar Graph - Left Column */}
              <div className="flex items-center justify-center pl-[200px]">
                <PerformanceGraph 
                  score={score}
                  targetScore={targetScore}
                  range={range}
                />
              </div>

              {/* Score Readout - Right Column */}
              <div className="flex justify-center">
                <div className={`${getBackgroundColor(score)} p-6 rounded-lg max-w-md`}>
                  <div className="flex items-center gap-6">
                    {getFaceIcon(score)}
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getTextColor(score)}`}>{score}</div>
                      <div className="text-gray-600 mt-2">
                        RANGE {range.min}-{range.max}
                      </div>
                      <div className={`text-sm font-medium ${getTextColor(score)} mt-1`}>
                        {getScoreLevelName(score)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons - Bottom */}
            <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
              <Button 
                onClick={() => navigate('/report')}
                variant="outline"
                className="w-full py-6 text-lg"
              >
                See full performance report
              </Button>
              <Button 
                className="w-full py-6 text-lg bg-[#06B6D4] hover:bg-[#06B6D4]/90"
              >
                Take another mini-assessment
              </Button>
            </div>
          </div>
        </div>

        <PrototypeControls 
          range={range}
          targetScore={targetScore}
          score={score}
          onRangeChange={handleRangeChange}
          onTargetScoreChange={(value) => setTargetScore(value[0])}
          onScoreChange={(value) => setScore(value[0])}
        />
      </div>
    </div>
  );
};

export default PerformanceBarChart;
