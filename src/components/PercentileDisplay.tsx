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
export const PercentileDisplay = ({
  percentile
}: PercentileDisplayProps) => {
  return <div className={`rounded-2xl p-3 inline-flex items-baseline ${getPercentileBackground(percentile)}`}>
      <div className="relative text-2xl font-bold text-gray-600 mr-6">
        {percentile}<span style={{
        top: '0.25rem'
      }} className="absolute text-lg\n">{ordinalSuffix}</span>
      </div>
      <span className="font-semibold text-gray-600">Percentile</span>
    </div>;
};