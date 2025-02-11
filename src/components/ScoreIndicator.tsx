
interface ScoreIndicatorProps {
  label: string;
  value: number;
  isTarget?: boolean;
}

const ScoreIndicator = ({ label, value, isTarget = false }: ScoreIndicatorProps) => {
  const baseColor = isTarget ? "bg-gray-500" : "bg-gray-800";
  const borderColor = isTarget ? "border-gray-500" : "border-gray-800";
  const textColor = isTarget ? "text-gray-500" : "text-gray-900";

  return (
    <div className={`flex items-center gap-0 ${isTarget ? "opacity-70" : ""}`}>
      <div className="flex items-center gap-2 w-[140px] justify-end">
        <span className={`text-sm font-medium ${textColor}`}>{label}</span>
      </div>
      <div className={`border-[0.5px] ${borderColor} px-2 py-0.5 rounded ml-2 shadow-sm bg-[#FFFFFF]`}>
        {value}
      </div>
      <div className={`h-0.5 ${baseColor} min-w-[100px]`} />
      <div className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] -ml-[1px] ${isTarget ? "border-l-gray-500" : "border-l-gray-800"}`} />
    </div>
  );
};

export default ScoreIndicator;
