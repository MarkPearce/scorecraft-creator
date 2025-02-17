
import ScoreIndicator from "./ScoreIndicator";
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface PerformanceGraphProps {
  score: number;
  targetScore: number;
  range: {
    min: number;
    max: number;
  };
  onTargetScoreChange?: (value: number) => void;
  examStep?: 'step1' | 'step2';
  passingStandard?: number;
}

const PerformanceGraph = ({ 
  score, 
  targetScore, 
  range, 
  onTargetScoreChange,
  examStep = 'step2',
  passingStandard
}: PerformanceGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const initialTouchY = useRef<number | null>(null);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isDragging]);

  const calculatePosition = (value: number) => {
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;
    return `${100 - percentage}%`;
  };

  const calculateValueFromPosition = (clientY: number) => {
    if (!containerRef.current) return targetScore;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = (clientY - rect.top) / rect.height;
    const value = range.max - (relativeY * (range.max - range.min));
    return Math.round(Math.max(range.min, Math.min(range.max, value)));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !onTargetScoreChange) return;
      e.preventDefault();
      const newValue = calculateValueFromPosition(e.clientY);
      onTargetScoreChange(newValue);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !onTargetScoreChange) return;
      e.preventDefault();
      const newValue = calculateValueFromPosition(e.touches[0].clientY);
      onTargetScoreChange(newValue);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      initialTouchY.current = null;
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
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
    if (!onTargetScoreChange) return;
    if ('touches' in e) {
      initialTouchY.current = e.touches[0].clientY;
    }
    setIsDragging(true);
  };

  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  const segments = [
    { score: range.min, color: "bg-[#019444]", label: `${Math.round(range.min)}` },
    { score: range.min + segmentSize, color: "bg-[#8DC641]", label: `${Math.round(range.min + segmentSize)}` },
    { score: range.min + (segmentSize * 2), color: "bg-[#FFC107]", label: `${Math.round(range.min + (segmentSize * 2))}` },
    { score: range.min + (segmentSize * 3), color: "bg-[#F46523]", label: `${Math.round(range.min + (segmentSize * 3))}` },
    { score: range.min + (segmentSize * 4), color: "bg-[#ED1B24]", label: `${Math.round(range.min + (segmentSize * 4))}` },
    { score: range.max, label: `${Math.round(range.max)}` }
  ];

  const getScoreSegment = (score: number) => {
    if (score >= range.max - segmentSize) return 5;
    if (score >= range.max - (segmentSize * 2)) return 4;
    if (score >= range.max - (segmentSize * 3)) return 3;
    if (score >= range.max - (segmentSize * 4)) return 2;
    return 1;
  };

  const getScoreColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "text-[#019444]";
      case 4: return "text-[#8DC641]";
      case 3: return "text-yellow-500";
      case 2: return "text-[#F46523]";
      default: return "text-[#ED1B24]";
    }
  };

  const getBackgroundColor = (score: number) => {
    const segment = getScoreSegment(score);
    switch (segment) {
      case 5: return "bg-[#019444]/15";
      case 4: return "bg-[#8DC641]/15";
      case 3: return "bg-yellow-500/15";
      case 2: return "bg-[#F46523]/15";
      default: return "bg-[#ED1B24]/15";
    }
  };

  const getFaceIcon = (score: number) => {
    const segment = getScoreSegment(score);
    const colorClass = getScoreColor(score);
    
    switch (segment) {
      case 5: return <Laugh className={`w-16 h-16 ${colorClass}`} />;
      case 4: return <Smile className={`w-16 h-16 ${colorClass}`} />;
      case 3: return <Meh className={`w-16 h-16 ${colorClass}`} />;
      case 2: return <Frown className={`w-16 h-16 ${colorClass}`} />;
      default: return <Angry className={`w-16 h-16 ${colorClass}`} />;
    }
  };

  const getScoreStatus = (currentScore: number) => {
    if (examStep === 'step1') {
      if (currentScore >= (passingStandard || 252)) {
        return "Your predicted score meets the passing standard";
      }
      return "Your predicted score is below the passing standard";
    }
    
    if (currentScore > targetScore) {
      return "Your predicted score exceeds your target score";
    } else if (currentScore === targetScore) {
      return "Your predicted score meets your target score";
    } else {
      return "Your predicted score is lower than your target score";
    }
  };

  const scoreStatus = getScoreStatus(score);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="flex items-center justify-center">
        <div className="relative">
          <div 
            className="relative h-[300px] flex p-1 rounded-lg"
            ref={containerRef}
          >
            <div className="relative h-full w-[50px] flex-shrink-0">
              {segments.map((segment) => (
                <div
                  key={`label-${segment.score}`}
                  className="absolute text-sm text-gray-600"
                  style={{
                    top: calculatePosition(segment.score),
                    transform: 'translateY(-50%)',
                    right: '8px',
                    width: '100%',
                    textAlign: 'right'
                  }}
                >
                  {segment.label}
                </div>
              ))}
            </div>

            <div className="relative ml-2 w-[60px] flex-shrink-0">
              <div className="h-full relative">
                {segments.slice(0, -1).map((segment, index) => (
                  <div 
                    key={segment.score}
                    className={`absolute w-full ${segment.color}`}
                    style={{
                      height: '20%',
                      top: `${index * 20}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative h-full -ml-[60px] w-[200px]">
              <div 
                className="absolute -translate-y-1/2"
                style={{ 
                  top: calculatePosition(score),
                  left: '0',
                  zIndex: 10
                }}
              >
                <ScoreIndicator 
                  label="Predicted Score"
                  value={score}
                />
              </div>

              {examStep === 'step1' && passingStandard && (
                <div 
                  className="absolute -translate-y-1/2"
                  style={{ 
                    top: calculatePosition(passingStandard),
                    left: '0',
                    zIndex: 20
                  }}
                >
                  <ScoreIndicator 
                    label="Passing Standard"
                    value={passingStandard}
                  />
                </div>
              )}

              {examStep === 'step2' && (
                <div 
                  className="absolute -translate-y-1/2"
                  style={{ 
                    top: calculatePosition(targetScore),
                    left: '0',
                    zIndex: 20
                  }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  <ScoreIndicator 
                    label="Target Score"
                    value={targetScore}
                    isTarget
                    showMoveIcon
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className={`${getBackgroundColor(score)} p-6 rounded-lg w-full`}>
          <h3 className="text-gray-900 font-semibold text-lg mb-4">Predicted Score</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              {getFaceIcon(score)}
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium">
                {scoreStatus}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
