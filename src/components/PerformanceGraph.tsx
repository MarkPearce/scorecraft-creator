
import { useRef } from "react";
import ScoreIndicator from "./ScoreIndicator";
import ScoreStatus from "./ScoreStatus";
import GraphSegments from "./GraphSegments";
import { calculatePosition } from "@/utils/scoreUtils";

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
        score: 200,
        color: "bg-[#FFC107]",
        label: "200"
      }, {
        score: 230,
        color: "bg-[#8DC641]",
        label: "230"
      }, {
        score: 265,
        color: "bg-[#019444]",
        label: "265"
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
        score: 265,
        color: "bg-[#019444]",
        label: "265"
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

  const segments = getSegments();
  const scoreStatus = getScoreStatus(score);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      <div className="performance-graph-container flex items-center justify-center pt-6 md:col-span-8">
        <div className="relative">
          <div className="relative h-[300px] flex p-1 rounded-lg" ref={containerRef}>
            <GraphSegments segments={segments} range={range} />

            <div className="relative h-full -ml-[60px] w-[200px]">
              <div
                className="absolute -translate-y-1/2"
                style={{
                  top: calculatePosition(score, range),
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
                    top: calculatePosition(targetScore, range),
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
        <ScoreStatus score={score} segments={segments} />
      </div>
    </div>
  );
};

export default PerformanceGraph;
