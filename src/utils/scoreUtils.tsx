
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";
import { ReactNode } from "react";

export const getScoreSegment = (score: number, range: { min: number; max: number }) => {
  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  if (score >= range.max - segmentSize) return 5; // Excellent
  if (score >= range.max - (segmentSize * 2)) return 4; // Strong
  if (score >= range.max - (segmentSize * 3)) return 3; // Developing
  if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
  return 1; // Critical
};

export const getFaceIcon = (score: number, colorClass: string): ReactNode => {
  const segment = getScoreSegment(score, { min: 180, max: 300 });
  const iconProps = { className: `w-16 h-16 ${colorClass}` };
  
  switch (segment) {
    case 5:
      return <Laugh {...iconProps} />;
    case 4:
      return <Smile {...iconProps} />;
    case 3:
      return <Meh {...iconProps} />;
    case 2:
      return <Frown {...iconProps} />;
    default:
      return <Angry {...iconProps} />;
  }
};
