
import ScoreIndicator from "./ScoreIndicator";

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

  return (
    <div className="flex items-center justify-start">
      {/* Graph wrapper - contains all graph elements */}
      <div className="w-fit relative p-2">
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
            <div className="relative h-full -ml-[60px]">
              {/* Target indicator */}
              <div 
                className="absolute transition-all duration-300"
                style={{ 
                  top: calculatePosition(targetScore),
                  transform: 'translateY(-50%)',
                  left: '60px'
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
                  left: '60px'
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
  );
};

export default PerformanceGraph;
