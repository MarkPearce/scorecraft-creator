
export const getPercentileColor = (percentile: number) => {
  if (percentile < 40) return "text-amber-500";
  if (percentile < 70) return "text-amber-600";
  return "text-amber-700";
};

export const getPercentileBackground = (percentile: number) => {
  if (percentile < 40) return "bg-amber-50";
  if (percentile < 70) return "bg-amber-100";
  return "bg-amber-200";
};
