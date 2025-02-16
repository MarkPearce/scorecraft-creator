
import { Input } from "@/components/ui/input";
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
    <div className="w-full space-y-6">
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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Score: {targetScore}
          </label>
          <p className="text-sm text-gray-500">
            Drag the target score indicator in the graph to adjust
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Score: {score}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrototypeControls;
