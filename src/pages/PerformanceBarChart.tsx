import { Button } from "@/components/ui/button";
import { ArrowLeft, Angry, Frown, Meh, Smile, Laugh, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PrototypeControls from "@/components/PrototypeControls";

const PerformanceBarChart = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(249);
  const [range, setRange] = useState({ min: 241, max: 257 });
  const [targetScore, setTargetScore] = useState(230);

  const getScoreLevelName = (score: number) => {
    if (score < 100) return "Critical";
    if (score < 150) return "Needs Work";
    if (score < 200) return "Developing";
    if (score < 250) return "Strong";
    return "Excellent";
  };

  const getScoreColor = (score: number) => {
    if (score < 100) return "bg-[#ED1B24]";
    if (score < 150) return "bg-[#F46523]";
    if (score < 200) return "bg-[#FFDD19]";
    if (score < 250) return "bg-[#8DC641]";
    return "bg-[#019444]";
  };

  const getBackgroundColor = (score: number) => {
    if (score < 100) return "bg-[#ED1B24]/15";
    if (score < 150) return "bg-[#F46523]/15";
    if (score < 200) return "bg-[#FFDD19]/15";
    if (score < 250) return "bg-[#8DC641]/15";
    return "bg-[#019444]/15";
  };

  const getTextColor = (score: number) => {
    if (score < 100) return "text-[#ED1B24]";
    if (score < 150) return "text-[#F46523]";
    if (score < 200) return "text-[#FFDD19]";
    if (score < 250) return "text-[#8DC641]";
    return "text-[#019444]";
  };

  const getFaceIcon = (score: number) => {
    const colorClass = getTextColor(score);
    if (score < 100) return <Angry className={`w-16 h-16 ${colorClass}`} />;
    if (score < 150) return <Frown className={`w-16 h-16 ${colorClass}`} />;
    if (score < 200) return <Meh className={`w-16 h-16 ${colorClass}`} />;
    if (score < 250) return <Smile className={`w-16 h-16 ${colorClass}`} />;
    if (score <= 300) return <Laugh className={`w-16 h-16 ${colorClass}`} />;
    return <AlertTriangle className={`w-16 h-16 ${colorClass}`} />;
  };

  const calculatePosition = (value: number) => {
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;
    return `${100 - percentage}%`;
  };

  const handleRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    setRange(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  // Calculate segment boundaries based on the range
  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  const segments = [
    { score: range.max, color: "bg-[#019444]", label: `${Math.round(range.max)}` },
    { score: range.max - segmentSize, color: "bg-[#8DC641]", label: `${Math.round(range.max - segmentSize)}` },
    { score: range.max - (segmentSize * 2), color: "bg-[#FFDD19]", label: `${Math.round(range.max - (segmentSize * 2))}` },
    { score: range.max - (segmentSize * 3), color: "bg-[#F46523]", label: `${Math.round(range.max - (segmentSize * 3))}` },
    { score: range.min, color: "bg-[#ED1B24]", label: `${Math.round(range.min)}` },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Bar Graph - Left Column */}
              <div className="flex justify-center">
                <div className="relative h-[300px] w-[60px]">
                  {/* Score segments */}
                  {segments.map((segment, index) => (
                    <div 
                      key={segment.score}
                      className={`absolute w-full ${segment.color}`}
                      style={{
                        height: '20%',
                        top: `${index * 20}%`,
                      }}
                    />
                  ))}
                  
                  {/* Score labels */}
                  <div className="absolute -right-8 h-full flex flex-col justify-between text-sm text-gray-600">
                    {segments.map((segment) => (
                      <span key={`label-${segment.score}`}>{segment.label}</span>
                    ))}
                  </div>

                  {/* Score indicator */}
                  <div 
                    className="absolute -left-24 transition-all duration-300 flex items-center gap-2 justify-end w-24"
                    style={{ 
                      top: calculatePosition(score),
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <span className="whitespace-nowrap text-sm font-medium">Your performance</span>
                    <div className="w-6 h-0.5 bg-gray-800" />
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-800" />
                  </div>

                  {/* Target score indicator */}
                  <div 
                    className="absolute -left-24 transition-all duration-300 flex items-center gap-2 opacity-50 justify-end w-24"
                    style={{ 
                      top: calculatePosition(targetScore),
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <span className="whitespace-nowrap text-sm font-medium">Target</span>
                    <div className="w-6 h-0.5 bg-gray-800" />
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-800" />
                  </div>
                </div>
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
