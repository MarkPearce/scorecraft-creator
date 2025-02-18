
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
      <div className="grid grid-cols-2 gap-6">
        <div className="relative text-4xl font-bold text-yellow-600 justify-self-end">
          {percentile}<span className="absolute text-xl" style={{ top: '0.25rem' }}>{ordinalSuffix}</span>
        </div>
        <div className="text-base text-gray-600 text-left pt-1">
          <span className="font-semibold block">Percentile</span>
          <span className="text-sm block mt-0.5">Current Standing</span>
        </div>
      </div>
    </div>
  );
};
