
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PercentileDisplay } from "@/components/PercentileDisplay";

// Generate data points for a standard normal distribution
const generateNormalDistributionData = () => {
  const points = [];
  const mean = 50; // Center at 50th percentile
  const numPoints = 100;
  
  for (let i = 0; i < numPoints; i++) {
    const percentile = i;
    
    // Convert percentile to z-score for the standard normal distribution formula
    const z = (percentile - mean) / (50 / 3); // Map to z-scores
    
    // Standard normal distribution formula: f(x) = (1/√(2π)) * e^(-x²/2)
    const normalValue = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(z * z) / 2);
    
    // Convert z-score to score (0-300 scale)
    const score = 150 + (z * 50); // Center at 150 with std dev of 50
    
    points.push({
      percentile: percentile,
      score: Math.min(300, Math.max(0, Math.round(score))), // Clamp between 0-300
      density: normalValue * 400 // Scale the density for visualization
    });
  }
  
  return points;
};

const data = generateNormalDistributionData();

// Mock student score and percentile
const studentScore = 245;
const studentPercentile = 65;

const PeerGroup = () => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState("all");
  const xAxisTicks = [0, 20, 40, 60, 80, 100];
  const yAxisTicks = [0, 50, 100, 150, 200, 250, 300];

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
                <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0aa6b8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0aa6b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="percentile" 
                type="number" 
                domain={[0, 100]}
                label={{
                  value: 'Percentile',
                  position: 'bottom',
                  offset: 20
                }}
                ticks={xAxisTicks}
                interval={0}
                tick={{
                  fontSize: 11,
                  dy: 10
                }}
              />
              <YAxis 
                dataKey="score"
                domain={[0, 300]}
                ticks={yAxisTicks}
                label={{
                  value: 'Score',
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
                formatter={(value: number, name: string) => {
                  if (name === 'density') return [`${Math.round(value * 100) / 100}`, 'Density'];
                  if (name === 'score') return [`${Math.round(value)}`, 'Score'];
                  return [value, name];
                }}
                labelFormatter={(label: number) => `${label}th Percentile`}
              />
              <Area
                type="monotone"
                dataKey="density"
                stroke="#0aa6b8"
                fill="url(#colorDensity)"
                strokeWidth={2}
              />
              <ReferenceLine
                x={studentPercentile}
                stroke="#374151"
                strokeWidth={2}
                label={{
                  value: `Your Score: ${studentScore}`,
                  position: 'top',
                  fill: '#374151',
                  fontSize: 14,
                  fontWeight: 600
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
