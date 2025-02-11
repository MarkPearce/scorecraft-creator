
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

// Generate data points for a bezier curve
const generateData = () => {
  const points = [];
  
  // Generate points every 20 units
  for (let score = 180; score <= 300; score += 20) {
    let count;
    if (score === 180) count = 10;
    else if (score === 240) count = 34;
    else if (score === 300) count = 1;
    else count = Math.max(1, Math.floor(34 * Math.exp(-Math.pow((score - 240) / 40, 2))));
    
    points.push({ score, count });
  }
  
  return points;
};

const data = generateData();

// Mock student score - this would typically come from props or an API
const studentScore = 238;

const CustomScoreLabel = ({ x, y }: { x: number, y: number }) => (
  <foreignObject x={x - 50} y={0} width={100} height={80}>
    <div className="bg-white/90 border border-emerald-200 rounded-md p-3 shadow-sm flex flex-col items-center justify-center">
      <p className="text-sm text-gray-600">Estimated Score</p>
      <p className="text-2xl font-bold text-emerald-600">{studentScore}</p>
    </div>
  </foreignObject>
);

const ScoreDistribution = () => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState("all");

  // Generate ticks every 20 units
  const xAxisTicks = Array.from({ length: 7 }, (_, i) => 180 + (i * 20));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Estimated Score compared to peers</h2>
      <p className="text-sm text-gray-600 mb-4">Your score compared to peer group performance</p>
      <div className="relative h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 40, right: 30, left: 40, bottom: 40 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="score" 
              label={{ value: 'Score', position: 'bottom', offset: 20 }}
              ticks={xAxisTicks}
              interval={0}
              tick={{ fontSize: 11, dy: 10 }}
            />
            <YAxis 
              domain={[0, 50]}
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
              type="natural"
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
            <ReferenceDot
              x={studentScore}
              y={0}
              r={0}
              shape={CustomScoreLabel}
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
