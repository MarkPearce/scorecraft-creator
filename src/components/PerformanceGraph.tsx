
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
    <div className="h-[300px] w-[60px] relative">
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

      {/* Target indicator (rendered first, so it appears behind) */}
      <div 
        className="absolute right-0 transition-all duration-300"
        style={{ 
          top: calculatePosition(targetScore),
          transform: 'translateY(-50%)'
        }}
      >
        <ScoreIndicator 
          label="Target Score"
          value={targetScore}
          isTarget
        />
      </div>

      {/* Score indicator (rendered last, so it appears in front) */}
      <div 
        className="absolute right-0 transition-all duration-300"
        style={{ 
          top: calculatePosition(score),
          transform: 'translateY(-50%)'
        }}
      >
        <ScoreIndicator 
          label="Estimated Score"
          value={score}
        />
      </div>
    </div>
  );
};

export default PerformanceGraph;
