
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
  const [initialY, setInitialY] = useState<number | null>(null);
  const [initialValue, setInitialValue] = useState<number | null>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isTarget) return;
    e.preventDefault();
    e.stopPropagation();
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setInitialY(clientY);
    setInitialValue(value);
    setIsDragging(true);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current || !onValueChange || initialY === null || initialValue === null) return;
    e.preventDefault();

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = initialY - clientY;
    const parentHeight = containerRef.current.parentElement?.getBoundingClientRect().height || 1;
    
    // Convert deltaY to value change (scale factor determines sensitivity)
    const scaleFactor = (max - min) / parentHeight;
    const valueChange = Math.round(deltaY * scaleFactor);
    const newValue = Math.max(min, Math.min(max, initialValue + valueChange));
    
    onValueChange(newValue);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setInitialY(null);
    setInitialValue(null);
  };

  useEffect(() => {
    if (isDragging) {
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        handleDrag(e);
      };

      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);

      return () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, initialY, initialValue]);

  // Calculate position based on value
  const position = ((value - min) / (max - min)) * 100;
  
  return (
    <div 
      className={`
        flex items-center gap-2
        ${isTarget ? 'select-none touch-none' : ''} 
        ${!isMobile && isTarget ? 'cursor-grab' : ''}
        ${!isMobile && isDragging ? 'cursor-grabbing' : ''}
        ${isTarget ? 'active:bg-gray-50/50 rounded-lg transition-colors' : ''}
        ${isMobile && isTarget ? 'p-2 -m-2' : ''}
        relative
      `}
      style={{
        top: `${100 - position}%`,
        transform: 'translateY(-50%)',
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
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

