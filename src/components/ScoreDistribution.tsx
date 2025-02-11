
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { score: '0-10', count: 5 },
  { score: '11-20', count: 15 },
  { score: '21-30', count: 25 },
  { score: '31-40', count: 35 },
  { score: '41-50', count: 30 },
  { score: '51-60', count: 20 },
];

// Mock student score - this would typically come from props or an API
const studentScore = 35;

const ScoreDistribution = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Score Distribution</h2>
      <div className="relative h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="score" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <ReferenceLine
              x={studentScore >= 50 ? '41-50' : `${Math.floor(studentScore / 10) * 10 + 1}-${(Math.floor(studentScore / 10) + 1) * 10}`}
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="3 3"
            />
          </BarChart>
        </ResponsiveContainer>
        <div 
          className="absolute bg-white/90 border border-emerald-200 rounded-md p-2 shadow-sm"
          style={{
            left: `${(Math.floor(studentScore / 10) / (data.length - 1)) * 100}%`,
            transform: 'translateX(-50%)',
            top: '0'
          }}
        >
          <p className="text-sm text-gray-600">Your Score</p>
          <p className="text-lg font-semibold text-emerald-600">{studentScore}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDistribution;
