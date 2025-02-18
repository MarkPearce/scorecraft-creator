
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MEAN_SCORE } from '@/utils/distributionUtils';

interface DistributionChartProps {
  data: any[];
  displayMode: "normal" | "percentile";
  studentScore: number;
  studentPercentile: number;
}

const DistributionChart = ({ data, displayMode, studentScore, studentPercentile }: DistributionChartProps) => {
  const xAxisTicks = [0, 50, 100, 150, 200, 250, 300];
  const normalDistributionTicks = Array.from({ length: 5 }, (_, i) => i * 0.002);
  const percentileTicks = [0, 20, 40, 60, 80, 100];
  
  const yAxisTicks = displayMode === "normal" 
    ? normalDistributionTicks
    : percentileTicks;

  // Find the exact data point for the mean score
  const meanPoint = data.find(point => Math.round(point.score) === MEAN_SCORE) || data.reduce((closest, current) => {
    const currentDiff = Math.abs(current.score - MEAN_SCORE);
    const closestDiff = Math.abs(closest.score - MEAN_SCORE);
    return currentDiff < closestDiff ? current : closest;
  }, data[0]);

  // Get the y-value for the mean point based on display mode
  const yValue = displayMode === "normal" ? meanPoint.density : meanPoint.percentile;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart 
        data={data} 
        margin={{
          top: 40,
          right: 30,
          left: 40,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0aa6b8" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0aa6b8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid 
          horizontal={true} 
          vertical={false} 
          strokeDasharray="3 3"
          opacity={0.5} 
        />
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
          dataKey={displayMode === "normal" ? "density" : "percentile"}
          domain={displayMode === "normal" ? [0, 0.01] : [0, 100]}
          label={{
            value: displayMode === "normal" ? 'Distribution (%)' : 'Percentile (%)',
            angle: -90,
            position: 'insideLeft',
            offset: 0,
            style: {
              textAnchor: 'middle'
            }
          }}
          ticks={yAxisTicks}
          tick={{
            fontSize: 11,
            dx: -10
          }}
          tickFormatter={(value) => {
            if (displayMode === "normal") {
              return `${(value * 100).toFixed(1)}%`;
            }
            return value;
          }}
        />
        <Tooltip 
          formatter={(value: number, name: string) => {
            if (name === 'density') return [`${(value * 100).toFixed(1)}%`, 'Distribution'];
            if (name === 'percentile') return [`${value.toFixed(1)}%`, 'Percentile'];
            return [value, name];
          }}
          labelFormatter={(score: number) => `Score: ${score}`}
        />
        <Area
          type="monotone"
          dataKey={displayMode === "normal" ? "density" : "percentile"}
          stroke="#0aa6b8"
          fill="url(#colorData)"
          strokeWidth={2}
          animationDuration={1500}
          animationBegin={0}
          isAnimationActive={true}
          animationEasing="ease-in-out"
        />
        <ReferenceLine
          x={MEAN_SCORE}
          stroke="#374151"
          strokeDasharray="3 3"
          ifOverflow="extendDomain"
          segment={[
            { x: MEAN_SCORE, y: 0 },
            { x: MEAN_SCORE, y: yValue }
          ]}
          label={{
            value: `Mean: ${MEAN_SCORE}`,
            position: 'insideBottomRight',
            fill: '#374151',
            fontSize: 14
          }}
        />
        <ReferenceLine
          x={studentScore}
          stroke="#0aa6b8"
          strokeDasharray="3 3"
          label={{
            value: `${studentPercentile}th Percentile: ${studentScore}`,
            position: 'top',
            fill: '#0aa6b8',
            fontSize: 14
          }}
        />
        {displayMode === "percentile" && (
          <ReferenceLine
            y={studentPercentile}
            stroke="#0aa6b8"
            strokeDasharray="3 3"
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DistributionChart;
