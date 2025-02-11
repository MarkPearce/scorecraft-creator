
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { score: '0-10', count: 5 },
  { score: '11-20', count: 15 },
  { score: '21-30', count: 25 },
  { score: '31-40', count: 35 },
  { score: '41-50', count: 30 },
  { score: '51-60', count: 20 },
];

const ScoreDistribution = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Score Distribution</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="score" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreDistribution;
