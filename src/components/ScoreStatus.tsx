
import { Angry, Laugh, Meh, Smile } from "lucide-react";
import { getScoreSegment, getScoreColor, getBackgroundColor, getScoreRange } from "@/utils/scoreUtils";

interface ScoreStatusProps {
  score: number;
  segments: Array<{ score: number }>;
}

const ScoreStatus = ({ score, segments }: ScoreStatusProps) => {
  const getFaceIcon = (score: number) => {
    const segment = getScoreSegment(score, segments);
    const colorClass = getScoreColor(score, segments);
    switch (segment) {
      case 4:
        return <Laugh className={`w-16 h-16 ${colorClass}`} />;
      case 3:
        return <Smile className={`w-16 h-16 ${colorClass}`} />;
      case 2:
        return <Meh className={`w-16 h-16 ${colorClass}`} />;
      default:
        return <Angry className={`w-16 h-16 ${colorClass}`} />;
    }
  };

  return (
    <div className={`${getBackgroundColor(score, segments)} p-6 rounded-lg inline-block`}>
      <h3 className="text-gray-900 font-semibold text-lg mb-4">Assessment</h3>
      <div className="flex">
        <div className="flex items-center gap-4">
          {getFaceIcon(score)}
          <div className="flex flex-col items-center">
            <div className={`text-4xl font-bold ${getScoreColor(score, segments)}`}>{score}</div>
            <div className={`text-sm ${getScoreColor(score, segments)}`}>{getScoreRange(score)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreStatus;
