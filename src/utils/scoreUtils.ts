
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";

export const getScoreSegment = (score: number, range: { min: number; max: number }) => {
  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  if (score >= range.max - segmentSize) return 5; // Excellent
  if (score >= range.max - (segmentSize * 2)) return 4; // Strong
  if (score >= range.max - (segmentSize * 3)) return 3; // Developing
  if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
  return 1; // Critical
};

export const getFaceIcon = (score: number, colorClass: string) => {
  const segment = getScoreSegment(score, { min: 180, max: 300 });
  
  switch (segment) {
    case 5: return <Laugh className={`w-16 h-16 ${colorClass}`} />;
    case 4: return <Smile className={`w-16 h-16 ${colorClass}`} />;
    case 3: return <Meh className={`w-16 h-16 ${colorClass}`} />;
    case 2: return <Frown className={`w-16 h-16 ${colorClass}`} />;
    default: return <Angry className={`w-16 h-16 ${colorClass}`} />;
  }
};
