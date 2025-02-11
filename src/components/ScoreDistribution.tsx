
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import ScoreBox from './ScoreBox';

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

  // Calculate the position considering the chart margins
  const leftMargin = 40;
  const rightMargin = 30;
  const chartWidth = 100 - ((leftMargin + rightMargin) / 100);
  const scorePosition = ((studentScore - 180) / (300 - 180)) * chartWidth + (leftMargin / 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Estimated Score compared to peers</h2>
      <p className="text-sm text-gray-600 mb-4">Your score compared to peer group performance</p>
      <div className="relative h-[400px] w-full">
        <ScoreBox score={studentScore} position={scorePosition} />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 50, right: 30, left: 40, bottom: 30 }}>
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
          </AreaChart>
        </ResponsiveContainer>
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
