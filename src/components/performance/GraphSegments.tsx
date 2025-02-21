
import { ExamStep, ScoreRange, ScoreSegment } from "./types";
import { getSegments } from "./utils";
import PassingRangeBracket from "../PassingRangeBracket";

interface GraphSegmentsProps {
  range: ScoreRange;
  targetScore: number;
  examStep: ExamStep;
}

const GraphSegments = ({ range, targetScore, examStep }: GraphSegmentsProps) => {
  const segments = getSegments(range, targetScore, examStep);

  return (
    <>
      <div className="relative h-full w-[50px] flex-shrink-0 bg-gray-100">
        {segments.map(segment => (
          <div
            key={`label-${segment.score}`}
            className="absolute text-sm text-gray-600 text-right whitespace-pre-line"
            style={{
              top: `${((range.max - segment.score) / (range.max - range.min)) * 100}%`,
              transform: 'translateY(-50%)',
              right: '8px',
              minWidth: '200px',
              direction: 'rtl'
            }}
          >
            {segment.label}
          </div>
        ))}

        {examStep === 'step1' && (
          <div
            className="absolute"
            style={{
              right: '0',
              top: `${((range.max - 196) / (range.max - range.min)) * 100}%`,
              transform: 'translateY(-50%)',
              zIndex: 5
            }}
          >
            <PassingRangeBracket />
          </div>
        )}
      </div>

      <div className="relative ml-2 w-[60px] flex-shrink-0">
        <div className="h-full relative">
          {segments.slice(0, -1).map((segment, index) => (
            <div
              key={segment.score}
              className={`absolute w-full ${segment.color}`}
              style={{
                height: `${((segments[index + 1].score - segment.score) / (range.max - range.min)) * 100}%`,
                top: `${((range.max - segments[index + 1].score) / (range.max - range.min)) * 100}%`
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GraphSegments;
