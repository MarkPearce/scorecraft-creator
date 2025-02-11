
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
    <div className="flex items-center gap-0">
      <div className="flex items-center gap-2 w-[140px] justify-end">
        <span className={`text-sm font-medium ${textColor}`}>{label}</span>
      </div>
      <div className={`border-[0.5px] ${borderColor} px-2 py-0.5 rounded ml-2 shadow-sm bg-white`}>
        <span className={isTarget ? "opacity-70" : ""}>{value}</span>
      </div>
      {/* Add white outline by using two lines - one white underneath and one colored on top */}
      <div className="relative min-w-[100px] z-10">
        <div className="h-1.5 bg-white absolute inset-y-[-2px] w-full" />
        <div className={`h-0.5 ${baseColor} relative min-w-[100px] ${isTarget ? "opacity-70" : ""}`} />
      </div>
      {/* Add white outline to arrow using layering technique */}
      <div className="relative -ml-[1px] z-0">
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-white absolute -left-[1px] -top-[1px]" />
        <div className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] relative ${isTarget ? "border-l-gray-500 opacity-70" : "border-l-gray-800"}`} />
      </div>
    </div>
  );
};

export default ScoreIndicator;
