
import { ExamStep, PerformanceRange, ScoreSegment } from "./types";

interface GraphSegmentsProps {
  range: PerformanceRange;
  targetScore: number;
  examStep: ExamStep;
}

const GraphSegments = ({ range, targetScore, examStep }: GraphSegmentsProps) => {
  const getSegments = (): ScoreSegment[] => {
    if (examStep === 'step1') {
      return [{
        score: range.min,
        color: "bg-[#ED1B24]",
        label: `${Math.round(range.min)}`
      }, {
        score: 196,
        color: "bg-[#FFC107]",
        label: ""
      }, {
        score: 210,
        color: "bg-[#019444]",
        label: ""
      }, {
        score: range.max,
        label: `${Math.round(range.max)}`
      }];
    } else {
      return [{
        score: range.min,
        color: "bg-[#ED1B24]",
        label: `${Math.round(range.min)}`
      }, {
        score: 214,
        color: "bg-[#FFC107]",
        label: "Passing standard: 214"
      }, {
        score: 230,
        color: "bg-[#8DC641]",
        label: "230"
      }, {
        score: targetScore,
        color: "bg-[#019444]",
        label: `${targetScore}`
      }, {
        score: range.max,
        label: `${Math.round(range.max)}`
      }];
    }
  };

  const segments = getSegments();

  return (
    <>
      <div className="relative h-full w-[50px] flex-shrink-0">
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
