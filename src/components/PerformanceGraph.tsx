
import { useRef } from "react";
import ScoreIndicator from "./ScoreIndicator";
import ScoreDisplay from "./performance/ScoreDisplay";
import GraphSegments from "./performance/GraphSegments";
import { PerformanceGraphProps } from "./performance/types";

const PerformanceGraph = ({
  score,
  targetScore,
  range,
  examStep = 'step2',
  passingStandard
}: PerformanceGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      <div className="performance-graph-container flex items-center justify-center pt-6 md:col-span-8">
        <div className="relative bg-[#FFDEE2] p-6 rounded-lg">
          <div className="relative h-[300px] flex" ref={containerRef}>
            <GraphSegments 
              range={range}
              targetScore={targetScore}
              examStep={examStep}
            />

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
        <ScoreDisplay 
          score={score}
          targetScore={targetScore}
          examStep={examStep}
        />
      </div>
    </div>
  );
};

export default PerformanceGraph;
