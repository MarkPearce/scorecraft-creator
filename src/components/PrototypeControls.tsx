
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

interface PrototypeControlsProps {
  range: {
    min: number;
    max: number;
  };
  targetScore: number;
  score: number;
  onRangeChange: (type: 'min' | 'max', value: string) => void;
  onTargetScoreChange: (value: number[]) => void;
  onScoreChange: (value: number[]) => void;
}

const PrototypeControls = ({
  range,
  targetScore,
  score,
  onRangeChange,
  onTargetScoreChange,
  onScoreChange,
}: PrototypeControlsProps) => {
  // Local state to handle immediate updates
  const [localScore, setLocalScore] = useState(score);
  const [localRange, setLocalRange] = useState(range);

  // Sync local state with props
  useEffect(() => {
    setLocalScore(score);
    setLocalRange(range);
  }, [score, range]);

  const handleRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    // Update local state immediately
    setLocalRange(prev => ({
      ...prev,
      [type]: numValue
    }));
    
    // Propagate change to parent
    onRangeChange(type, value);
  };

  const handleScoreChange = (value: number[]) => {
    // Update local state immediately
    setLocalScore(value[0]);
    
    // Propagate change to parent
    onScoreChange(value);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="min-range" className="block text-sm font-medium text-gray-700 mb-1">
            Min Range
          </label>
          <Input
            id="min-range"
            type="number"
            value={localRange.min}
            onChange={(e) => handleRangeChange('min', e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="max-range" className="block text-sm font-medium text-gray-700 mb-1">
            Max Range
          </label>
          <Input
            id="max-range"
            type="number"
            value={localRange.max}
            onChange={(e) => handleRangeChange('max', e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div>
        <label htmlFor="prediction-score" className="block text-sm font-medium text-gray-700 mb-1">
          Prediction: {localScore}
        </label>
        <Slider
          value={[localScore]}
          min={localRange.min}
          max={localRange.max}
          step={1}
          onValueChange={handleScoreChange}
          className="relative w-full h-2"
        />
      </div>
    </div>
  );
};

export default PrototypeControls;
