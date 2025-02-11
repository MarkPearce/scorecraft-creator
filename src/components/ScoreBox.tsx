
import { ReferenceLine } from 'recharts';

interface ScoreBoxProps {
  score: number;
  position: number;
}

const ScoreBox = ({ score, position }: ScoreBoxProps) => {
  return (
    <>
      <div 
        className="absolute bg-white/90 border border-emerald-200 rounded-md p-3 shadow-sm flex flex-col items-center justify-center"
        style={{
          left: `${position * 100}%`,
          transform: 'translate(-50%, -50%)',
          top: '20px'
        }}
      >
        <p className="text-sm text-gray-600">Estimated Score</p>
        <p className="text-2xl font-bold text-emerald-600">{score}</p>
      </div>
      <ReferenceLine
        x={score}
        stroke="#10B981"
        strokeWidth={2}
        strokeDasharray="3 3"
      />
    </>
  );
};

export default ScoreBox;
