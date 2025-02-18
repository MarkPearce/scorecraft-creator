
import { getPercentileColor } from "@/utils/colors";

interface PercentileDisplayProps {
  percentile: number;
}

const getPercentileBackground = (percentile: number) => {
  if (percentile < 40) return "bg-yellow-500/15";
  if (percentile < 70) return "bg-yellow-500/15";
  return "bg-yellow-500/15";
};

const ordinalSuffix = "th";

export const PercentileDisplay = ({ percentile }: PercentileDisplayProps) => {
  return (
    <div className={`rounded-2xl p-3 inline-flex items-baseline justify-center ${getPercentileBackground(percentile)}`}>
      <div className="text-3xl font-bold text-yellow-600">
        {percentile}<span className="text-lg align-super">{ordinalSuffix}</span>
      </div>
      <span className="font-semibold text-gray-600 ml-2">Percentile</span>
    </div>
  );
};
