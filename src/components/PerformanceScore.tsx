
import { getFaceIcon } from "@/utils/scoreUtils";

interface PerformanceScoreProps {
  score: number;
  range: {
    min: number;
    max: number;
  };
  getBackgroundColor: (score: number) => string;
  getTextColor: (score: number) => string;
}

const PerformanceScore = ({ score, range, getBackgroundColor, getTextColor }: PerformanceScoreProps) => {
  return (
    <div className={`${getBackgroundColor(score)} p-6 rounded-lg max-w-md w-full`}>
      <div className="flex items-center gap-6 justify-center">
        {getFaceIcon(score, getTextColor(score))}
        <div className="text-center">
          <div className={`text-6xl font-bold ${getTextColor(score)} font-playfair`}>{score}</div>
          <div className="text-gray-600 mt-2 font-playfair">
            RANGE {range.min}-{range.max}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceScore;
