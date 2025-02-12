
export const getPercentileColor = (percentile: number) => {
  if (percentile < 40) return "text-amber-500";
  if (percentile < 70) return "text-amber-600";
  return "text-amber-700";
};
