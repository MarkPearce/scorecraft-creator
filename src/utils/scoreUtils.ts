
export const calculatePosition = (value: number, range: { min: number; max: number }) => {
  const percentage = (value - range.min) / (range.max - range.min) * 100;
  return `${100 - percentage}%`;
};

export const getScoreSegment = (score: number, segments: Array<{ score: number }>) => {
  if (score >= segments[3].score) return 4;
  if (score >= segments[2].score) return 3;
  if (score >= segments[1].score) return 2;
  return 1;
};

export const getScoreColor = (score: number, segments: Array<{ score: number }>) => {
  const segment = getScoreSegment(score, segments);
  switch (segment) {
    case 4:
      return "text-[#019444]";
    case 3:
      return "text-[#8DC641]";
    case 2:
      return "text-yellow-500";
    default:
      return "text-[#ED1B24]";
  }
};

export const getBackgroundColor = (score: number, segments: Array<{ score: number }>) => {
  const segment = getScoreSegment(score, segments);
  switch (segment) {
    case 4:
      return "bg-[#019444]/15";
    case 3:
      return "bg-[#8DC641]/15";
    case 2:
      return "bg-yellow-500/15";
    default:
      return "bg-[#ED1B24]/15";
  }
};

export const getScoreRange = (score: number) => {
  const floor = Math.floor(score / 10) * 10;
  return `${floor}-${floor + 9}`;
};
