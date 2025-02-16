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
}

const PerformanceGraph = ({ score, targetScore, range, onTargetScoreChange }: PerformanceGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
  }, [isDragging, onTargetScoreChange]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!onTargetScoreChange) return;
    e.preventDefault();
    setIsDragging(true);
    
    const clientY = 'touches' in e 
      ? e.touches[0].clientY 
      : e.clientY;
    
    const newValue = calculateValueFromPosition(clientY);
    onTargetScoreChange(newValue);
  };

  const totalRange = range.max - range.min;
  const segmentSize = totalRange / 5;
  
  const segments = [
    { score: range.min, color: "bg-[#019444]", label: `${Math.round(range.min)}` },  // Dark green starts (top)
    { score: range.min + segmentSize, color: "bg-[#8DC641]", label: `${Math.round(range.min + segmentSize)}` },  // Light green starts
    { score: range.min + (segmentSize * 2), color: "bg-[#FFC107]", label: `${Math.round(range.min + (segmentSize * 2))}` },  // Bright yellow starts
    { score: range.min + (segmentSize * 3), color: "bg-[#F46523]", label: `${Math.round(range.min + (segmentSize * 3))}` },  // Orange starts
    { score: range.min + (segmentSize * 4), color: "bg-[#ED1B24]", label: `${Math.round(range.min + (segmentSize * 4))}` },  // Red starts (bottom)
    { score: range.max, label: `${Math.round(range.max)}` }  // Top value
  ];

  const getScoreSegment = (score: number) => {
    if (score >= range.max - segmentSize) return 5; // Excellent
    if (score >= range.max - (segmentSize * 2)) return 4; // Strong
    if (score >= range.max - (segmentSize * 3)) return 3; // Developing
    if (score >= range.max - (segmentSize * 4)) return 2; // Needs Work
    return 1; // Critical
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

  return (
    <div className="grid grid-cols-2 w-full gap-6">
      {/* Left Column - Graph Container */}
      <div className="flex items-center justify-center">
        {/* Graph wrapper - contains all graph elements */}
        <div className="w-fit relative p-6 pl-52 rounded-lg">
          <div 
            className="relative h-[300px] flex graph-container"
            ref={containerRef}
          >
            {/* Graph container with three distinct sections */}
            <div className="flex relative">
              {/* 1. Colored bar section */}
              <div className="w-[60px] h-full relative">
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

              {/* 2. Score labels section */}
              <div className="relative h-full ml-2">
                {segments.map((segment) => (
                  <div
                    key={`label-${segment.score}`}
                    className="absolute text-sm text-gray-600"
                    style={{
                      top: calculatePosition(segment.score),
                      transform: 'translateY(-50%)',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    {segment.label}
                  </div>
                ))}
              </div>

              {/* 3. Score indicators section */}
              <div className="absolute h-full w-0" style={{ left: 0 }}>
                {/* Target indicator */}
                <div 
                  className="absolute transition-all duration-300 group"
                  style={{ 
                    top: calculatePosition(targetScore),
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
                    top: calculatePosition(score),
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

      {/* Right Column - Score Display with Smiley Face */}
      <div className="flex items-center justify-center">
        <div className={`${getBackgroundColor(score)} p-6 rounded-lg`}>
          <div className="flex items-center justify-center gap-6">
            {getFaceIcon(score)}
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
              <div className="text-gray-600 mt-2">Current Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
