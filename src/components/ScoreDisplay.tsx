
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";
import { getBackgroundColor, getScoreColor, getScoreSegment } from "@/utils/scoreUtils";

interface ScoreDisplayProps {
  score: number;
  range: {
    min: number;
    max: number;
  };
}

const ScoreDisplay = ({ score, range }: ScoreDisplayProps) => {
  const getFaceIcon = (score: number) => {
    const segment = getScoreSegment(score, range);
    const colorClass = getScoreColor(score, range);
    
    switch (segment) {
      case 5: return <Laugh className={`w-16 h-16 ${colorClass}`} />;
      case 4: return <Smile className={`w-16 h-16 ${colorClass}`} />;
      case 3: return <Meh className={`w-16 h-16 ${colorClass}`} />;
      case 2: return <Frown className={`w-16 h-16 ${colorClass}`} />;
      default: return <Angry className={`w-16 h-16 ${colorClass}`} />;
    }
  };

  return (
    <div className={`${getBackgroundColor(score, range)} p-6 rounded-lg`}>
      <div className="flex items-center justify-center gap-6">
        {getFaceIcon(score)}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score, range)}`}>{score}</div>
          <div className="text-gray-600 mt-2">Current Score</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
