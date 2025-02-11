
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
      <div 
        className="absolute bg-emerald-600 w-[2px] h-[calc(100%-40px)] opacity-50"
        style={{
          left: `${position * 100}%`,
          transform: 'translateX(-50%)',
          top: '40px',
          backgroundImage: 'linear-gradient(transparent 0%, transparent 50%, white 50%, white 100%)',
          backgroundSize: '4px 8px'
        }}
      />
    </>
  );
};

export default ScoreBox;
