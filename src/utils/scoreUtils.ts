
export const calculatePosition = (value: number, range: { min: number; max: number }) => {
  const percentage = ((value - range.min) / (range.max - range.min)) * 100;
  return `${100 - percentage}%`;
};

export const calculateValueFromPosition = (
  clientY: number,
  containerRect: DOMRect,
  range: { min: number; max: number }
) => {
  const relativeY = (clientY - containerRect.top) / containerRect.height;
  const value = range.max - (relativeY * (range.max - range.min));
  return Math.round(Math.max(range.min, Math.min(range.max, value)));
};

export const getScoreSegment = (score: number, range: { min: number; max: number }) => {
  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  if (score >= range.max - segmentSize) return 5; // Excellent
  if (score >= range.max - (segmentSize * 2)) return 4; // Strong
  if (score >= range.max - (segmentSize * 3)) return 3; // Developing
  if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
  return 1; // Critical
};

export const getScoreColor = (score: number, range: { min: number; max: number }) => {
  const segment = getScoreSegment(score, range);
  switch (segment) {
    case 5: return "text-[#019444]";
    case 4: return "text-[#8DC641]";
    case 3: return "text-yellow-500";
    case 2: return "text-[#F46523]";
    default: return "text-[#ED1B24]";
  }
};

export const getBackgroundColor = (score: number, range: { min: number; max: number }) => {
  const segment = getScoreSegment(score, range);
  switch (segment) {
    case 5: return "bg-[#019444]/15";
    case 4: return "bg-[#8DC641]/15";
    case 3: return "bg-yellow-500/15";
    case 2: return "bg-[#F46523]/15";
    default: return "bg-[#ED1B24]/15";
  }
};

export const calculateSegments = (range: { min: number; max: number }) => {
  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  return [
    { score: range.min, color: "bg-[#019444]", label: `${Math.round(range.min)}` },
    { score: range.min + segmentSize, color: "bg-[#8DC641]", label: `${Math.round(range.min + segmentSize)}` },
    { score: range.min + (segmentSize * 2), color: "bg-[#FFC107]", label: `${Math.round(range.min + (segmentSize * 2))}` },
    { score: range.min + (segmentSize * 3), color: "bg-[#F46523]", label: `${Math.round(range.min + (segmentSize * 3))}` },
    { score: range.min + (segmentSize * 4), color: "bg-[#ED1B24]", label: `${Math.round(range.min + (segmentSize * 4))}` },
    { score: range.max, label: `${Math.round(range.max)}` }
  ];
};
