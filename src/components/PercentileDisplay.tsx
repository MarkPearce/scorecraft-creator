
import { getPercentileColor } from "@/utils/colors";
interface PercentileDisplayProps {
  percentile: number;
}
const getPercentileBackground = (percentile: number) => {
  if (percentile < 40) return "bg-white border border-gray-600/20";
  if (percentile < 70) return "bg-white border border-gray-600/20";
  return "bg-white border border-gray-600/20";
};
const ordinalSuffix = "th";
export const PercentileDisplay = ({
  percentile
}: PercentileDisplayProps) => {
  return <div className={`rounded-2xl px-5 py-1 inline-flex items-baseline ${getPercentileBackground(percentile)}`}>
      <div className="relative text-2xl font-bold text-gray-600 mr-6">
        {percentile}<span style={{
        top: '0.25rem'
      }} className="absolute text-base\n">{ordinalSuffix}</span>
      </div>
      <span className="font-semibold text-gray-600">Percentile</span>
    </div>;
};
