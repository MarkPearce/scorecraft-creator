
import { MoveVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScoreIndicatorProps {
  label: string;
  value: number;
  isTarget?: boolean;
  showMoveIcon?: boolean;
}

const ScoreIndicator = ({ 
  label, 
  value, 
  isTarget = false, 
  showMoveIcon = false,
}: ScoreIndicatorProps) => {
  const isMobile = useIsMobile();
  const baseColor = isTarget ? "bg-gray-500" : "bg-gray-800";
  const borderColor = isTarget ? "border-gray-500" : "border-gray-800";
  const textColor = isTarget ? "text-gray-500" : "text-gray-900";

  return (
    <div className={`
      flex items-center whitespace-nowrap
      ${isTarget ? 'select-none' : ''} 
      ${!isMobile && isTarget ? 'cursor-grab active:cursor-grabbing' : ''}
      ${isTarget ? 'active:bg-gray-50/50' : ''}
      ${isMobile && isTarget ? 'p-2 -m-2' : ''}
    `}>
      {/* Line and Value box container */}
      <div className="flex items-center">
        {/* Line */}
        <div className="relative min-w-[80px]">
          <div className="h-1.5 bg-white absolute inset-y-[-2px] w-full z-0" />
          <div className={`h-0.5 ${baseColor} relative z-10 min-w-[80px] ${isTarget ? "opacity-70" : ""}`} />
        </div>

        {/* Value box - positioned over the lines */}
        <div className={`
          border-[0.5px] ${borderColor} px-2 py-0.5 rounded shadow-sm bg-white
          ${isTarget ? 'active:scale-105' : ''}
          -ml-[1px] relative z-20
        `}>
          <span className={isTarget ? "opacity-70" : ""}>{value}</span>
        </div>
      </div>

      {/* Icon and Label container with gray background */}
      <div className="flex items-center ml-2 bg-gray-50 px-2 py-1 rounded">
        {showMoveIcon && (
          <MoveVertical className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} ${textColor}`} />
        )}
        <span className={`text-sm font-medium ${textColor} ${showMoveIcon ? 'ml-2' : ''}`}>{label}</span>
      </div>
    </div>
  );
};

export default ScoreIndicator;
