
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PercentileDisplay } from "@/components/PercentileDisplay";

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
    points.push({
      score,
      count
    });
  }
  return points;
};
const data = generateData();

// Mock student score - this would typically come from props or an API
const studentScore = 245;

const PeerGroup = () => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState("all");
  const xAxisTicks = Array.from({ length: 7 }, (_, i) => 180 + i * 20);

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle>Peer group comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <p className="text-gray-600 mb-4 text-base font-lato">
            You are currently at the <span className="text-yellow-600">65<sup className="text-sm">th</sup></span> percentile compared to other learners.
          </p>

          <div className="absolute right-8 top-8 z-50">
            <PercentileDisplay percentile={65} />
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{
              top: 20,
              right: 30,
              left: 40,
              bottom: 0
            }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0aa6b8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0aa6b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="score" type="number" allowDecimals={false} domain={['dataMin', 'dataMax']} label={{
                value: 'Score',
                position: 'bottom',
                offset: 20
              }} ticks={xAxisTicks} interval={0} tick={{
                fontSize: 11,
                dy: 10
              }} padding={{
                left: 20,
                right: 20
              }} orientation="bottom" />
              <YAxis domain={[0, 40]} allowDecimals={false} width={60} orientation="left" type="number" padding={{
                top: 20,
                bottom: 0
              }} label={{
                value: 'Peer Group',
                angle: -90,
                position: 'insideLeft',
                offset: 0,
                style: {
                  textAnchor: 'middle'
                }
              }} tick={{
                fontSize: 11,
                dx: -10
              }} />
              <Tooltip formatter={(value: number) => [`${value} students`, 'Frequency']} labelFormatter={(label: number) => `Score: ${label}`} />
              <Area type="natural" dataKey="count" stroke="#0aa6b8" fill="url(#colorCount)" strokeWidth={2} />
              <ReferenceLine x={studentScore} stroke="#374151" strokeWidth={2} label={{
                value: `Predicted Score ${studentScore}`,
                position: 'top',
                fill: '#374151',
                fontSize: 14,
                fontWeight: 600,
                dy: -15
              }} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-3 w-[200px] space-y-2">
            <Label htmlFor="peer-group">Peer Group</Label>
            <Select value={selectedPeerGroup} onValueChange={setSelectedPeerGroup}>
              <SelectTrigger id="peer-group" className="w-full">
                <SelectValue placeholder="Select peer group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="same-state">Same State</SelectItem>
                <SelectItem value="same-year">Same Year</SelectItem>
                <SelectItem value="same-school">Same School</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerGroup;
