
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

// Generate data points for a bezier curve
const generateData = () => {
  const points = [];
  
  // Add start point
  points.push({ score: 180, count: 10 });
  
  // Add peak point
  points.push({ score: 240, count: 34 });
  
  // Add end point
  points.push({ score: 300, count: 1 });
  
  return points;
};

const data = generateData();

// Mock student score - this would typically come from props or an API
const studentScore = 250;

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        fontSize={11}
      >
        {payload.value}
      </text>
    </g>
  );
};

const ScoreDistribution = () => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState("all");

  // Calculate the position considering the chart margins
  const leftMargin = 40;
  const rightMargin = 30;
  const chartWidth = 100 - ((leftMargin + rightMargin) / 100);
  const scorePosition = ((studentScore - 180) / (300 - 180)) * chartWidth + (leftMargin / 100);

  // Generate ticks every 10 units
  const xAxisTicks = Array.from({ length: 13 }, (_, i) => 180 + (i * 10));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Estimated Score compared to peers</h2>
      <p className="text-sm text-gray-600 mb-4">Your score compared to peer group performance</p>
      <div className="relative h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
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
              tick={CustomTick}
              interval={0}
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
          </AreaChart>
        </ResponsiveContainer>
        <div 
          className="absolute bg-white/90 border border-emerald-200 rounded-md p-3 shadow-sm flex flex-col items-center justify-center"
          style={{
            left: `${scorePosition * 100}%`,
            transform: 'translate(-50%, -50%)',
            top: '20px'
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
