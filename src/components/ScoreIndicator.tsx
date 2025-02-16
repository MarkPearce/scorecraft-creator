
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
      <div className={`relative min-w-[100px] ${isTarget ? "z-10" : "z-20"}`}>
        <div className="h-1.5 bg-white absolute inset-y-[-2px] left-0 right-[60px] z-0" />
        <div className={`h-0.5 ${baseColor} relative z-10 ${isTarget ? "opacity-70" : ""}`} style={{ width: '160px' }} />
      </div>
      <div className="flex items-center gap-2 w-[140px] ml-2">
        <span className={`text-sm font-medium ${textColor}`}>{label}</span>
        <div className={`border-[0.5px] ${borderColor} px-2 py-0.5 rounded shadow-sm bg-white`}>
          <span className={isTarget ? "opacity-70" : ""}>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreIndicator;
