
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";

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
  // Ensure scores stay within range when range changes
  useEffect(() => {
    if (targetScore < range.min) {
      onTargetScoreChange([range.min]);
    } else if (targetScore > range.max) {
      onTargetScoreChange([range.max]);
    }

    if (score < range.min) {
      onScoreChange([range.min]);
    } else if (score > range.max) {
      onScoreChange([range.max]);
    }
  }, [range.min, range.max]);

  return (
    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Prototype Controls</h2>
      <div className="w-full max-w-md space-y-6 mx-auto">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="min-range" className="block text-sm font-medium text-gray-700 mb-1">
              Min Range
            </label>
            <Input
              id="min-range"
              type="number"
              value={range.min}
              onChange={(e) => onRangeChange('min', e.target.value)}
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
              value={range.max}
              onChange={(e) => onRangeChange('max', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="target-score" className="block text-sm font-medium text-gray-700 mb-1">
              Target Score: {targetScore}
            </label>
            <Slider
              value={[targetScore]}
              min={range.min}
              max={range.max}
              step={1}
              onValueChange={onTargetScoreChange}
              className="w-full h-1.5"
            />
          </div>
          <div>
            <label htmlFor="prediction-score" className="block text-sm font-medium text-gray-700 mb-1">
              Prediction: {score}
            </label>
            <Slider
              value={[score]}
              min={range.min}
              max={range.max}
              step={1}
              onValueChange={onScoreChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeControls;
