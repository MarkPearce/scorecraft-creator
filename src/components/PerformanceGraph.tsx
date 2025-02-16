
import { useRef, useState, useEffect } from "react";
import ScoreIndicator from "./ScoreIndicator";
import ScoreDisplay from "./ScoreDisplay";
import ScoreGraphBars from "./ScoreGraphBars";
import { calculatePosition, calculateValueFromPosition } from "@/utils/scoreUtils";

interface PerformanceGraphProps {
  score: number;
  targetScore: number;
  range: {
    min: number;
    max: number;
  };
  onTargetScoreChange?: (value: number) => void;
}

const PerformanceGraph = ({ score, targetScore, range, onTargetScoreChange }: PerformanceGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !onTargetScoreChange || !containerRef.current) return;
      e.preventDefault();
      const newValue = calculateValueFromPosition(e.clientY, containerRef.current.getBoundingClientRect(), range);
      onTargetScoreChange(newValue);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !onTargetScoreChange || !containerRef.current) return;
      e.preventDefault();
      const newValue = calculateValueFromPosition(
        e.touches[0].clientY,
        containerRef.current.getBoundingClientRect(),
        range
      );
      onTargetScoreChange(newValue);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
      window.addEventListener('mouseleave', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('mouseleave', handleDragEnd);
    };
  }, [isDragging, onTargetScoreChange, range]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!onTargetScoreChange || !containerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    
    const clientY = 'touches' in e 
      ? e.touches[0].clientY 
      : e.clientY;
    
    const newValue = calculateValueFromPosition(
      clientY,
      containerRef.current.getBoundingClientRect(),
      range
    );
    onTargetScoreChange(newValue);
  };

  return (
    <div className="grid grid-cols-2 w-full gap-6">
      <div className="flex items-center justify-center">
        <div className="w-fit relative p-6 pl-52 rounded-lg">
          <div 
            className="relative h-[300px] flex graph-container"
            ref={containerRef}
          >
            <div className="flex relative">
              <ScoreGraphBars range={range} />
              <div className="absolute h-full w-0" style={{ left: 0 }}>
                {/* Target indicator */}
                <div 
                  className="absolute transition-all duration-300 group"
                  style={{ 
                    top: calculatePosition(targetScore, range),
                    right: '-60px'
                  }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  <div className="flex items-center">
                    <ScoreIndicator 
                      label="Target Score"
                      value={targetScore}
                      isTarget
                      showMoveIcon
                    />
                  </div>
                </div>

                {/* Score indicator */}
                <div 
                  className="absolute transition-all duration-300"
                  style={{ 
                    top: calculatePosition(score, range),
                    right: '-60px'
                  }}
                >
                  <ScoreIndicator 
                    label="Estimated Score"
                    value={score}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ScoreDisplay score={score} range={range} />
      </div>
    </div>
  );
};

export default PerformanceGraph;
