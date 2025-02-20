
import { calculatePosition } from "@/utils/scoreUtils";

interface GraphSegmentsProps {
  segments: Array<{
    score: number;
    color?: string;
    label: string;
  }>;
  range: {
    min: number;
    max: number;
  };
}

const GraphSegments = ({ segments, range }: GraphSegmentsProps) => {
  return (
    <>
      <div className="relative h-full w-[50px] flex-shrink-0">
        {segments.map(segment => (
          <div
            key={`label-${segment.score}`}
            className="absolute text-sm text-gray-600 text-right whitespace-pre-line"
            style={{
              top: calculatePosition(segment.score, range),
              transform: 'translateY(-50%)',
              right: '8px',
              minWidth: '200px',
              direction: 'rtl'
            }}
          >
            {segment.label}
          </div>
        ))}
      </div>

      <div className="relative ml-2 w-[60px] flex-shrink-0">
        <div className="h-full relative">
          {segments.slice(0, -1).map((segment, index) => (
            <div
              key={segment.score}
              className={`absolute w-full ${segment.color}`}
              style={{
                height: `${(segments[index + 1].score - segment.score) / (range.max - range.min) * 100}%`,
                top: calculatePosition(segments[index + 1].score, range)
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GraphSegments;
