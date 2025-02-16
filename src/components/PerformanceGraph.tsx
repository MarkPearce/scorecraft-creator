
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
  ].reverse(); // Reverse to match flex-col order (top to bottom)

  // Calculate which segment contains the score/target for styling
  const getSegmentIndex = (value: number) => {
    return segments.findIndex((segment, index) => {
      const nextSegment = segments[index + 1];
      if (!nextSegment) return true;
      return value >= nextSegment.score && value <= segment.score;
    });
  };

  const scoreIndex = getSegmentIndex(score);
  const targetIndex = getSegmentIndex(targetScore);

  return (
    <div className="flex items-start justify-start h-[300px]">
      <div className="flex flex-row gap-2 h-full">
        {/* Score indicators column */}
        <div className="flex flex-col justify-between h-full relative">
          {segments.map((segment, index) => {
            const showTargetHere = targetIndex === index;
            const showScoreHere = scoreIndex === index;
            
            return (
              <div key={`indicators-${segment.score}`} className="flex-1 flex items-center">
                {showTargetHere && (
                  <div className="transition-all duration-300">
                    <ScoreIndicator 
                      label="Target Score"
                      value={targetScore}
                      isTarget
                    />
                  </div>
                )}
                {showScoreHere && (
                  <div className="transition-all duration-300">
                    <ScoreIndicator 
                      label="Estimated Score"
                      value={score}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Color bar column */}
        <div className="w-[60px] flex flex-col h-full">
          {segments.slice(0, -1).map((segment) => (
            <div 
              key={`segment-${segment.score}`}
              className={`flex-1 ${segment.color}`}
            />
          ))}
        </div>

        {/* Labels column */}
        <div className="flex flex-col justify-between h-full text-sm text-gray-600">
          {segments.map((segment) => (
            <div 
              key={`label-${segment.score}`}
              className="flex items-center"
            >
              {segment.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
