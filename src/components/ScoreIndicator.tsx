
import { MoveVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ScoreIndicatorProps {
  label: string;
  value: number;
  isTarget?: boolean;
  showMoveIcon?: boolean;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
}

const ScoreIndicator = ({ 
  label, 
  value, 
  isTarget = false, 
  showMoveIcon = false,
  onValueChange,
  min = 0,
  max = 100
}: ScoreIndicatorProps) => {
  const baseColor = isTarget ? "bg-gray-500" : "bg-gray-800";
  const borderColor = isTarget ? "border-gray-500" : "border-gray-800";
  const textColor = isTarget ? "text-gray-500" : "text-gray-900";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isTarget) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current || !onValueChange) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const height = rect.height;
    
    // Get Y position based on mouse or touch event
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const relativeY = clientY - rect.top;
    const percentage = 1 - (relativeY / height);
    
    // Calculate new value based on percentage and range
    const newValue = Math.round(min + (percentage * (max - min)));
    const clampedValue = Math.max(min, Math.min(max, newValue));
    
    onValueChange(clampedValue);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  return (
    <div 
      className={`flex items-center gap-0 cursor-${isTarget ? 'grab' : 'default'} ${isDragging ? 'cursor-grabbing' : ''}`}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      ref={containerRef}
    >
      <div className="flex items-center gap-2 w-[140px] justify-end">
        <span className={`text-sm font-medium ${textColor}`}>{label}</span>
      </div>
      {showMoveIcon && (
        <MoveVertical className={`h-5 w-5 mx-2 ${textColor}`} />
      )}
      <div className={`border-[0.5px] ${borderColor} px-2 py-0.5 rounded ml-2 shadow-sm bg-white`}>
        <span className={isTarget ? "opacity-70" : ""}>{value}</span>
      </div>
      {/* Add white outline by using two lines - one white underneath and one colored on top */}
      <div className="relative min-w-[100px]">
        <div className="h-1.5 bg-white absolute inset-y-[-2px] w-full z-0" />
        <div className={`h-0.5 ${baseColor} relative min-w-[100px] z-10 ${isTarget ? "opacity-70" : ""}`} />
      </div>
    </div>
  );
};

export default ScoreIndicator;
