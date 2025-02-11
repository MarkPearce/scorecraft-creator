
import { getPercentileColor } from "@/utils/colors";

interface PercentileDisplayProps {
  percentile: number;
}

const getPercentileBackground = (percentile: number) => {
  if (percentile < 40) return "bg-red-50";
  if (percentile < 70) return "bg-amber-50";
  return "bg-green-50";
};

export const PercentileDisplay = ({ percentile }: PercentileDisplayProps) => {
  return (
    <div className={`rounded-2xl p-6 ${getPercentileBackground(percentile)}`}>
      <div className="flex items-center justify-center space-x-4">
        <div className={`text-7xl font-bold ${getPercentileColor(percentile)}`}>
          {percentile}
        </div>
        <div className="text-xl text-gray-600 text-left">
          <span className="font-semibold">Percentile</span>
          <br />
          <span className="text-base">Current Standing</span>
        </div>
      </div>
    </div>
  );
};
