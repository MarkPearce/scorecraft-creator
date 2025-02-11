
interface ScoreIndicatorProps {
  label: string;
  value: number;
  isTarget?: boolean;
}

const ScoreIndicator = ({ label, value, isTarget = false }: ScoreIndicatorProps) => {
  const baseColor = isTarget ? "bg-gray-500" : "bg-gray-800";
  const textColor = isTarget ? "text-gray-500" : "text-gray-900";

  return (
    <div className={`flex items-center gap-2 ${isTarget ? "opacity-70" : ""}`}>
      <span className={`text-sm font-medium ${textColor}`}>{label}</span>
      <div className="border border-gray-300 px-2 py-0.5 rounded bg-white">
        {value}
      </div>
      <div className={`flex-1 h-0.5 ${baseColor} min-w-[100px]`} />
      <div className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] ${isTarget ? "border-l-gray-500" : "border-l-gray-800"}`} />
    </div>
  );
};

export default ScoreIndicator;
