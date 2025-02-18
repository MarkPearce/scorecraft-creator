
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
    <div className={`rounded-2xl p-4 ${getPercentileBackground(percentile)}`}>
      <div className="flex flex-col items-center space-y-1">
        <span className="font-semibold text-gray-600">Percentile</span>
        <div className="relative text-3xl font-bold text-yellow-600">
          {percentile}<span className="absolute text-lg" style={{ top: '0.25rem' }}>{ordinalSuffix}</span>
        </div>
      </div>
    </div>
  );
};
