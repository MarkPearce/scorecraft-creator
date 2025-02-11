
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

// Convert the discrete data into more points for a smoother curve
const data = [
  { score: 180, count: 2 },
  { score: 190, count: 3 },
  { score: 200, count: 5 },
  { score: 210, count: 12 },
  { score: 220, count: 15 },
  { score: 230, count: 20 },
  { score: 240, count: 25 },
  { score: 250, count: 35 },
  { score: 260, count: 30 },
  { score: 270, count: 25 },
  { score: 280, count: 20 },
  { score: 290, count: 15 },
  { score: 300, count: 10 }
];

// Mock student score - this would typically come from props or an API
const studentScore = 250;

const ScoreDistribution = () => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState("all");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Estimated Score compared to peers</h2>
      <p className="text-sm text-gray-600 mb-4">Your score compared to peer group performance</p>
      <div className="relative h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 30 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="score" 
              label={{ value: 'Score', position: 'bottom', offset: 15 }}
              tick={{ fontSize: 11, dy: 10 }}
            />
            <YAxis 
              label={{ 
                value: 'Peer Group', 
                angle: -90, 
                position: 'insideLeft',
                offset: 0,
                style: { textAnchor: 'middle' }
              }}
              tick={{ fontSize: 11, dx: -10 }}
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
          className="absolute bg-white/90 border border-emerald-200 rounded-md p-3 shadow-sm flex flex-col items-center"
          style={{
            left: `${((studentScore - 180) / (300 - 180)) * 100}%`,
            transform: 'translateX(-50%)',
            top: '0'
          }}
        >
          <p className="text-sm text-gray-600">Estimated Score</p>
          <p className="text-2xl font-bold text-emerald-600">{studentScore}</p>
        </div>
      </div>

      <div className="mt-4 w-[200px] space-y-2">
        <Label htmlFor="peer-group">Peer Group</Label>
        <Select value={selectedPeerGroup} onValueChange={setSelectedPeerGroup}>
          <SelectTrigger id="peer-group" className="w-full">
            <SelectValue placeholder="Select peer group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="same-major">Same Major</SelectItem>
            <SelectItem value="same-year">Same Year</SelectItem>
            <SelectItem value="same-school">Same School</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ScoreDistribution;
