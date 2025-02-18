
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PercentileDisplay } from "@/components/PercentileDisplay";

// Generate data points for a standard normal distribution
const generateNormalDistributionData = () => {
  const points = [];
  const mean = 240; // Center of our distribution
  const stdDev = 20; // Standard deviation
  const numPoints = 100; // Increased number of points for smoother curve
  
  // Generate points for x from -3 to 3 standard deviations
  for (let i = 0; i < numPoints; i++) {
    // Convert to range [-3, 3] for standard normal distribution
    const z = -3 + (i / (numPoints - 1)) * 6;
    
    // Standard normal distribution formula
    const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(z * z) / 2);
    
    // Transform z-score back to score scale
    const score = mean + (z * stdDev);
    
    // Scale the height of the curve for better visualization
    const scaledCount = y * 2000;
    
    points.push({
      score: Math.round(score),
      count: scaledCount
    });
  }
  
  return points;
};

const data = generateNormalDistributionData();

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
            You are currently at the <span className="text-gray-600">65<sup className="text-xs">th</sup></span> percentile compared to other learners.
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
                  <stop offset="5%" stopColor="#0aa6b8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0aa6b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="score" 
                type="number" 
                domain={['dataMin', 'dataMax']} 
                label={{
                  value: 'Score',
                  position: 'bottom',
                  offset: 20
                }}
                ticks={xAxisTicks}
                interval={0}
                tick={{
                  fontSize: 11,
                  dy: 10
                }}
                padding={{
                  left: 20,
                  right: 20
                }}
              />
              <YAxis 
                domain={[0, 'dataMax']}
                label={{
                  value: 'Frequency',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 0,
                  style: {
                    textAnchor: 'middle'
                  }
                }}
                tick={{
                  fontSize: 11,
                  dx: -10
                }}
              />
              <Tooltip 
                formatter={(value: number) => [`${Math.round(value)} students`, 'Frequency']}
                labelFormatter={(label: number) => `Score: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#0aa6b8"
                fill="url(#colorCount)"
                strokeWidth={2}
              />
              <ReferenceLine
                x={studentScore}
                stroke="#374151"
                strokeWidth={2}
                label={{
                  value: `Predicted Score ${studentScore}`,
                  position: 'top',
                  fill: '#374151',
                  fontSize: 14,
                  fontWeight: 600,
                  dy: -15
                }}
              />
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
