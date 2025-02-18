
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Customized } from 'recharts';
import { MEAN_SCORE, normalDistribution, STD_DEV } from '@/utils/distributionUtils';

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
          type="basis"
          dataKey={displayMode === "normal" ? "density" : "percentile"}
          stroke="#0aa6b8"
          fill="url(#colorData)"
          strokeWidth={2}
        />
        
        <Customized component={({ chartHeight, xScale, yScale }) => {
          const dataPoint = data.find(point => Math.abs(point.score - MEAN_SCORE) < 1);
          if (!dataPoint) return null;
          
          const x = xScale(MEAN_SCORE);
          const y = yScale(displayMode === "normal" ? dataPoint.density : dataPoint.percentile);
          
          return (
            <g>
              <line 
                x1={x} 
                x2={x} 
                y1={y} 
                y2={chartHeight - 40} 
                stroke="#374151" 
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <text
                x={x + 5}
                y={20}
                fill="#374151"
                fontSize={14}
              >
                Mean: {MEAN_SCORE}
              </text>
            </g>
          );
        }} />
        
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

