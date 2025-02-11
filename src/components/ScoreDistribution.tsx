
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Convert the discrete data into more points for a smoother curve
const data = [
  { score: 0, count: 2 },
  { score: 5, count: 3 },
  { score: 10, count: 5 },
  { score: 15, count: 12 },
  { score: 20, count: 15 },
  { score: 25, count: 20 },
  { score: 30, count: 25 },
  { score: 35, count: 35 },
  { score: 40, count: 30 },
  { score: 45, count: 25 },
  { score: 50, count: 20 },
  { score: 55, count: 15 },
  { score: 60, count: 10 }
];

// Mock student score - this would typically come from props or an API
const studentScore = 35;

const ScoreDistribution = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Score Distribution</h2>
      <p className="text-sm text-gray-600 mb-4">Your score compared to peer group performance</p>
      <div className="relative h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="score" 
              label={{ value: 'Score', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              label={{ value: 'Number of Students', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} students`, 'Frequency']}
              labelFormatter={(label: number) => `Score: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              fill="url(#colorCount)"
              strokeWidth={2}
            />
            <ReferenceLine
              x={studentScore}
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="3 3"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div 
          className="absolute bg-white/90 border border-emerald-200 rounded-md p-2 shadow-sm"
          style={{
            left: `${(studentScore / 60) * 100}%`,
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
