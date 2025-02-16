
import { calculatePosition, calculateSegments } from "@/utils/scoreUtils";

interface ScoreGraphBarsProps {
  range: {
    min: number;
    max: number;
  };
}

const ScoreGraphBars = ({ range }: ScoreGraphBarsProps) => {
  const segments = calculateSegments(range);

  return (
    <div className="flex relative">
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
      <div className="relative h-full ml-2">
        {segments.map((segment) => (
          <div
            key={`label-${segment.score}`}
            className="absolute text-sm text-gray-600"
            style={{
              top: calculatePosition(segment.score, range),
              transform: 'translateY(-50%)',
              width: '100%',
              textAlign: 'left'
            }}
          >
            {segment.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreGraphBars;
