
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Normal distribution parameters
const MEAN_SCORE = 249; // μ (mu)
const STD_DEV = 50;    // σ (sigma)

// Error function approximation
// Using Abramowitz and Stegun approximation (maximum error: 1.5×10−7)
const erf = (x: number): number => {
  const t = 1.0 / (1.0 + 0.3275911 * Math.abs(x));
  const p = 0.254829592;
  const b = -0.284496736;
  const h = 1.421413741;
  const q = -1.453152027;
  const d = 1.061405429;
  
  const calculation = 1.0 - (p * t + b * t ** 2 + h * t ** 3 + q * t ** 4 + d * t ** 5) * Math.exp(-x * x);
  return x >= 0 ? calculation : -calculation;
};

// Calculate normal distribution probability density
const normalDistribution = (x: number, mu: number, sigma: number): number => {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * 
         Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
};

// Generate data points for visualization
const generateNormalDistributionData = () => {
  const points = [];
  const numPoints = 300; // More points for smoother curve
  
  // Generate points across the score range (0-300)
  for (let score = 0; score <= 300; score += (300 / numPoints)) {
    const density = normalDistribution(score, MEAN_SCORE, STD_DEV);
    const percentile = (score - MEAN_SCORE) / STD_DEV; // Z-score
    const normalizedPercentile = (1 + erf(percentile / Math.sqrt(2))) / 2; // Convert Z-score to percentile
    
    points.push({
      score: Math.round(score),
      density: density * 2000, // Scale for better visualization
      percentileValue: normalizedPercentile
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
  const [displayMode, setDisplayMode] = useState<"normal" | "percentile">("normal");
  const xAxisTicks = [0, 50, 100, 150, 200, 250, 300];
  const yAxisTicks = [0, 0.002, 0.004, 0.006, 0.008];

  // Find the score at 65th percentile
  const percentileScore = data.find(point => Math.round(point.percentileValue * 100) === studentPercentile)?.score || studentScore;

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Peer group comparison</CardTitle>
        <div className="w-[180px]">
          <Select value={displayMode} onValueChange={(value: "normal" | "percentile") => setDisplayMode(value)}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select display mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal Distribution</SelectItem>
              <SelectItem value="percentile">Percentile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <p className="text-gray-600 mb-4 text-base font-lato">
            You are currently at the <span className="text-gray-600">65<sup className="text-xs">th</sup></span> percentile compared to other learners.
          </p>
          
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
                dataKey="score" 
                type="number" 
                domain={[0, 300]}
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
              />
              <YAxis 
                dataKey={displayMode === "normal" ? "density" : "percentileValue"}
                domain={displayMode === "normal" ? [0, 'auto'] : [0, 1]}
                label={{
                  value: displayMode === "normal" ? 'Probability Density' : 'Percentile',
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
                  if (name === 'density') return [`${(value / 2000).toFixed(4)}`, 'Density'];
                  if (name === 'percentileValue') return [`${(value * 100).toFixed(1)}%`, 'Percentile'];
                  if (name === 'score') return [`${Math.round(value)}`, 'Score'];
                  return [value, name];
                }}
                labelFormatter={(score: number) => `Score: ${score}`}
              />
              <Area
                type="monotone"
                dataKey={displayMode === "normal" ? "density" : "percentileValue"}
                stroke="#0aa6b8"
                fill="url(#colorDensity)"
                strokeWidth={2}
              />
              <ReferenceLine
                x={MEAN_SCORE}
                stroke="#374151"
                strokeDasharray="3 3"
                label={{
                  value: `Mean: ${MEAN_SCORE}`,
                  position: 'insideBottomRight',
                  fill: '#374151',
                  fontSize: 14
                }}
              />
              <ReferenceLine
                x={percentileScore}
                stroke="#0aa6b8"
                strokeDasharray="3 3"
                label={{
                  value: `65th Percentile: ${Math.round(percentileScore)}`,
                  position: 'top',
                  fill: '#0aa6b8',
                  fontSize: 14
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
