
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
      flex items-center gap-2
      ${isTarget ? 'select-none' : ''} 
      ${!isMobile && isTarget ? 'cursor-grab active:cursor-grabbing' : ''}
      ${isTarget ? 'active:bg-gray-50/50 rounded-lg' : ''}
      ${isMobile && isTarget ? 'p-2 -m-2' : ''}
    `}>
      {/* Line */}
      <div className="relative min-w-[100px]">
        <div className="h-1.5 bg-white absolute inset-y-[-2px] w-full z-0" />
        <div className={`h-0.5 ${baseColor} relative min-w-[100px] z-10 ${isTarget ? "opacity-70" : ""}`} />
      </div>

      {/* Value box */}
      <div className={`
        border-[0.5px] ${borderColor} px-2 py-0.5 rounded shadow-sm bg-white
        ${isTarget ? 'active:scale-105' : ''}
      `}>
        <span className={isTarget ? "opacity-70" : ""}>{value}</span>
      </div>

      {/* Arrow icon (if present) */}
      {showMoveIcon && (
        <MoveVertical className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} ${textColor}`} />
      )}

      {/* Label */}
      <div className="flex items-center">
        <span className={`text-sm font-medium ${textColor}`}>{label}</span>
      </div>
    </div>
  );
};

export default ScoreIndicator;
