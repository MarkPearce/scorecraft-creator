
import { getPercentileColor, getPercentileBackground } from "@/utils/colors";

interface PercentileDisplayProps {
  percentile: number;
}

const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

const PercentileDisplay = ({ percentile }: PercentileDisplayProps) => {
  const ordinalSuffix = getOrdinalSuffix(percentile);
  
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
