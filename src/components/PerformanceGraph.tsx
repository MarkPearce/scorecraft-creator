
import { useRef } from "react";
import ScoreIndicator from "./ScoreIndicator";
import { Angry, Laugh, Meh, Smile } from "lucide-react";
import PassingRangeBracket from "./PassingRangeBracket";

interface PerformanceGraphProps {
  score: number;
  targetScore: number;
  range: {
    min: number;
    max: number;
  };
  examStep?: 'step1' | 'step2';
  passingStandard?: number;
}

const PerformanceGraph = ({
  score,
  targetScore,
  range,
  examStep = 'step2',
  passingStandard
}: PerformanceGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getSegments = () => {
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

  const getScoreStatus = (currentScore: number) => {
    if (examStep === 'step1') {
      if (currentScore >= (passingStandard || 196)) {
        return "Your predicted score meets the passing standard";
      }
      return "Your predicted score is below the passing standard";
    }
    if (currentScore > targetScore) {
      return "Your predicted score exceeds your target score";
    } else if (currentScore === targetScore) {
      return "Your predicted score meets your target score";
    } else {
      return "Your predicted score is lower than your target score";
    }
  };

  const getScoreColor = (currentScore: number) => {
    if (examStep === 'step1') {
      if (currentScore >= 210) return "text-[#019444]";
      if (currentScore >= 196) return "text-[#FFC107]";
      return "text-[#ED1B24]";
    } else {
      if (currentScore >= targetScore) return "text-[#019444]";
      if (currentScore >= 230) return "text-[#8DC641]";
      if (currentScore >= 214) return "text-[#FFC107]";
      return "text-[#ED1B24]";
    }
  };

  const getBackgroundColor = (currentScore: number) => {
    if (examStep === 'step1') {
      if (currentScore >= 210) return "bg-[#019444]/15";
      if (currentScore >= 196) return "bg-[#FFC107]/15";
      return "bg-[#ED1B24]/15";
    } else {
      if (currentScore >= targetScore) return "bg-[#019444]/15";
      if (currentScore >= 230) return "bg-[#8DC641]/15";
      if (currentScore >= 214) return "bg-[#FFC107]/15";
      return "bg-[#ED1B24]/15";
    }
  };

  const getFaceIcon = (currentScore: number) => {
    const colorClass = getScoreColor(currentScore);
    if (examStep === 'step1') {
      if (currentScore >= 210) return <Laugh className={`w-16 h-16 ${colorClass}`} />;
      if (currentScore >= 196) return <Smile className={`w-16 h-16 ${colorClass}`} />;
      return <Angry className={`w-16 h-16 ${colorClass}`} />;
    } else {
      if (currentScore >= targetScore) return <Laugh className={`w-16 h-16 ${colorClass}`} />;
      if (currentScore >= 230) return <Smile className={`w-16 h-16 ${colorClass}`} />;
      if (currentScore >= 214) return <Meh className={`w-16 h-16 ${colorClass}`} />;
      return <Angry className={`w-16 h-16 ${colorClass}`} />;
    }
  };

  const segments = getSegments();
  const scoreStatus = getScoreStatus(score);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      <div className="performance-graph-container flex items-center justify-center pt-6 md:col-span-8">
        <div className="relative">
          <div className="relative h-[300px] flex" ref={containerRef}>
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
                
                {examStep === 'step1' && (
                  <>
                    <div
                      className="absolute w-full bg-white/50"
                      style={{
                        height: `${((210 - 182) / (range.max - range.min)) * 100}%`,
                        top: `${((range.max - 210) / (range.max - range.min)) * 100}%`
                      }}
                    />
                    <div
                      className="absolute h-full pointer-events-none"
                      style={{
                        top: `${((range.max - 210) / (range.max - range.min)) * 100}%`,
                        height: `${((210 - 182) / (range.max - range.min)) * 100}%`,
                        width: '128px',
                        right: 'calc(100% - 8px)'
                      }}
                    >
                      <PassingRangeBracket />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="relative h-full -ml-[60px] w-[200px]">
              <div
                className="absolute -translate-y-1/2"
                style={{
                  top: `${((range.max - score) / (range.max - range.min)) * 100}%`,
                  left: '0',
                  zIndex: 10
                }}
              >
                <ScoreIndicator label="Assessment" value={score} />
              </div>

              {examStep === 'step2' && (
                <div
                  className="absolute -translate-y-1/2"
                  style={{
                    top: `${((range.max - targetScore) / (range.max - range.min)) * 100}%`,
                    left: '0',
                    zIndex: 20
                  }}
                >
                  <ScoreIndicator label="Target Score" value={targetScore} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="score-status-container flex items-start justify-start md:col-span-4">
        <div className={`${getBackgroundColor(score)} p-6 rounded-lg inline-block`}>
          <h3 className="text-gray-900 font-semibold text-lg mb-4">Assessment</h3>
          <div className="flex">
            <div className="flex items-center gap-4">
              {getFaceIcon(score)}
              <div className="flex flex-col items-center">
                <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
                <div className={`text-sm ${getScoreColor(score)}`}>
                  {Math.floor(score / 10) * 10}-{Math.floor(score / 10) * 10 + 9}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;

