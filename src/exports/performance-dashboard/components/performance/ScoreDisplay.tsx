
import { Angry, Laugh, Meh, Smile } from "lucide-react";
import { ExamStep } from "./types";
import { getBackgroundColor, getScoreColor } from "./utils";

interface ScoreDisplayProps {
  score: number;
  targetScore: number;
  examStep: ExamStep;
}

const getFaceIcon = (currentScore: number, targetScore: number, examStep: ExamStep) => {
  const colorClass = getScoreColor(currentScore, targetScore, examStep);
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

const ScoreDisplay = ({ score, targetScore, examStep }: ScoreDisplayProps) => {
  const scoreColor = getScoreColor(score, targetScore, examStep);
  const backgroundColor = getBackgroundColor(score, targetScore, examStep);

  return (
    <div className={`${backgroundColor} p-6 rounded-lg inline-block`}>
      <h3 className="text-gray-900 font-semibold text-lg mb-4">Assessment</h3>
      <div className="flex">
        <div className="flex items-center gap-4">
          {getFaceIcon(score, targetScore, examStep)}
          <div className="flex flex-col items-center">
            <div className={`text-4xl font-bold ${scoreColor}`}>{score}</div>
            <div className={`text-sm ${scoreColor}`}>
              {Math.floor(score / 10) * 10}-{Math.floor(score / 10) * 10 + 9}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
