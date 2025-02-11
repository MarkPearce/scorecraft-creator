
export const getPercentileColor = (percentile: number) => {
  if (percentile < 40) return "text-red-700";
  if (percentile < 70) return "text-yellow-600";
  return "text-green-600";
};
