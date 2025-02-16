
import { MoveVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const baseColor = isTarget ? "bg-gray-500" : "bg-gray-800";
  const borderColor = isTarget ? "border-gray-500" : "border-gray-800";
  const textColor = isTarget ? "text-gray-500" : "text-gray-900";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [startValue, setStartValue] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTarget || !onValueChange) return;
    e.preventDefault();
    
    setStartY(e.clientY);
    setStartValue(value);
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTarget || !onValueChange) return;
    e.preventDefault();
    
    setStartY(e.touches[0].clientY);
    setStartValue(value);
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || startY === null || startValue === null || !onValueChange) return;
    e.preventDefault();

    const deltaY = startY - e.clientY;
    const parentHeight = containerRef.current?.parentElement?.getBoundingClientRect().height || 300;
    const valueRange = max - min;
    const pixelsPerUnit = parentHeight / valueRange;
    
    const valueDelta = Math.round(deltaY / pixelsPerUnit);
    const newValue = Math.max(min, Math.min(max, startValue + valueDelta));
    
    onValueChange(newValue);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || startY === null || startValue === null || !onValueChange) return;
    e.preventDefault();

    const deltaY = startY - e.touches[0].clientY;
    const parentHeight = containerRef.current?.parentElement?.getBoundingClientRect().height || 300;
    const valueRange = max - min;
    const pixelsPerUnit = parentHeight / valueRange;
    
    const valueDelta = Math.round(deltaY / pixelsPerUnit);
    const newValue = Math.max(min, Math.min(max, startValue + valueDelta));
    
    onValueChange(newValue);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setStartY(null);
    setStartValue(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, startY, startValue]);

  return (
    <div 
      className={`
        flex items-center gap-2
        ${isTarget ? 'select-none touch-none' : ''} 
        ${!isMobile && isTarget ? 'cursor-ns-resize' : ''}
        ${!isMobile && isDragging ? 'cursor-grabbing' : ''}
        ${isTarget ? 'active:bg-gray-50/50 rounded-lg transition-colors' : ''}
        ${isMobile && isTarget ? 'p-2 -m-2' : ''}
        relative
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      ref={containerRef}
    >
      <div className="flex items-center gap-2 w-[140px] justify-end">
        <span className={`text-sm font-medium ${textColor}`}>{label}</span>
      </div>
      {showMoveIcon && (
        <MoveVertical className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} mx-2 ${textColor}`} />
      )}
      <div className={`
        border-[0.5px] ${borderColor} px-2 py-0.5 rounded ml-2 shadow-sm bg-white
        ${isTarget ? 'active:scale-105 transition-transform' : ''}
      `}>
        <span className={isTarget ? "opacity-70" : ""}>{value}</span>
      </div>
      <div className="relative min-w-[100px]">
        <div className="h-1.5 bg-white absolute inset-y-[-2px] w-full z-0" />
        <div className={`h-0.5 ${baseColor} relative min-w-[100px] z-10 ${isTarget ? "opacity-70" : ""}`} />
      </div>
    </div>
  );
};

export default ScoreIndicator;

