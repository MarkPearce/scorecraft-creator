
import ScoreIndicator from "./ScoreIndicator";
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";

interface PerformanceGraphProps {
  score: number;
  targetScore: number;
  range: {
    min: number;
    max: number;
  };
}

const PerformanceGraph = ({ score, targetScore, range }: PerformanceGraphProps) => {
  const calculatePosition = (value: number) => {
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;
    return `${100 - percentage}%`;
  };

  // Calculate segment size
  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  // Calculate segment boundaries from bottom to top
  const segments = [
    { score: range.min, color: "bg-[#ED1B24]", label: `${Math.round(range.min)}` },  // Red starts
    { score: range.min + segmentSize, color: "bg-[#F46523]", label: `${Math.round(range.min + segmentSize)}` },  // Orange starts
    { score: range.min + (segmentSize * 2), color: "bg-yellow-500", label: `${Math.round(range.min + (segmentSize * 2))}` },  // Yellow starts
    { score: range.min + (segmentSize * 3), color: "bg-[#8DC641]", label: `${Math.round(range.min + (segmentSize * 3))}` },  // Light green starts
    { score: range.min + (segmentSize * 4), color: "bg-[#019444]", label: `${Math.round(range.min + (segmentSize * 4))}` },  // Dark green starts
    { score: range.max, label: `${Math.round(range.max)}` }  // Top value
  ];

  const getScoreSegment = (score: number) => {
    if (score >= range.max - segmentSize) return 5; // Excellent
    if (score >= range.max - (segmentSize * 2)) return 4; // Strong
    if (score >= range.max - (segmentSize * 3)) return 3; // Developing
    if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
    return 1; // Critical
  };

  const getScoreColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "text-[#019444]";
      case 4: return "text-[#8DC641]";
      case 3: return "text-yellow-500";
      case 2: return "text-[#F46523]";
      default: return "text-[#ED1B24]";
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

  const getFaceIcon = (score: number) => {
    const segment = getScoreSegment(score);
    const colorClass = getScoreColor(score);
    
    switch (segment) {
      case 5: return <Laugh className={`w-16 h-16 ${colorClass}`} />;
      case 4: return <Smile className={`w-16 h-16 ${colorClass}`} />;
      case 3: return <Meh className={`w-16 h-16 ${colorClass}`} />;
      case 2: return <Frown className={`w-16 h-16 ${colorClass}`} />;
      default: return <Angry className={`w-16 h-16 ${colorClass}`} />;
    }
  };

  return (
    <div className="grid grid-cols-2 w-full gap-6">
      {/* Left Column - Graph Container */}
      <div className="flex items-center justify-center">
        {/* Graph wrapper - contains all graph elements */}
        <div className="w-fit relative p-6 border-r border-gray-200 bg-[#D3E4FD] rounded-lg">
          <div className="relative h-[300px] flex">
            {/* Graph container with three distinct sections */}
            <div className="flex relative">
              {/* 1. Colored bar section */}
              <div className="w-[60px] h-full relative">
                {segments.slice(0, -1).map((segment, index) => (
                  <div 
                    key={segment.score}
                    className={`absolute w-full ${segment.color}`}
                    style={{
                      height: '20%',
                      top: `${index * 20}%`,
                    }}
                  />
                ))}
              </div>

              {/* 2. Score labels section */}
              <div className="relative h-full ml-2">
                {segments.map((segment) => (
                  <div
                    key={`label-${segment.score}`}
                    className="absolute text-sm text-gray-600"
                    style={{
                      top: calculatePosition(segment.score),
                      transform: 'translateY(-50%)',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    {segment.label}
                  </div>
                ))}
              </div>

              {/* 3. Score indicators section */}
              <div className="absolute h-full w-0" style={{ left: 0 }}>
                {/* Target indicator */}
                <div 
                  className="absolute transition-all duration-300"
                  style={{ 
                    top: calculatePosition(targetScore),
                    transform: 'translateY(-50%)',
                    right: '-60px'
                  }}
                >
                  <ScoreIndicator 
                    label="Target Score"
                    value={targetScore}
                    isTarget
                  />
                </div>

                {/* Score indicator */}
                <div 
                  className="absolute transition-all duration-300"
                  style={{ 
                    top: calculatePosition(score),
                    transform: 'translateY(-50%)',
                    right: '-60px'
                  }}
                >
                  <ScoreIndicator 
                    label="Estimated Score"
                    value={score}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Score Display with Smiley Face */}
      <div className="flex items-center justify-center">
        <div className={`${getBackgroundColor(score)} p-6 rounded-lg`}>
          <div className="flex items-center justify-center gap-6">
            {getFaceIcon(score)}
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
              <div className="text-gray-600 mt-2">Current Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;

