
import { getPercentileColor } from "@/utils/colors";

interface PercentileDisplayProps {
  percentile: number;
}

const PercentileDisplay = ({ percentile }: PercentileDisplayProps) => {
  return (
    <div className={`rounded-2xl p-6 ${getPercentileBackground(percentile)}`}>
      <div className="grid grid-cols-2 gap-12">
        <div className={`relative text-7xl font-bold ${getPercentileColor(percentile)} justify-self-end`}>
          {percentile}<span className="absolute text-3xl" style={{ top: '0.5rem' }}>{ordinalSuffix}</span>
        </div>
        <div className="text-xl text-gray-600 text-left pt-2">
          <span className="font-semibold block">Percentile</span>
          <span className="text-base block mt-1">Current Standing</span>
        </div>
      </div>
    </div>
  );
};

export default PercentileDisplay;
