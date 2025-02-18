import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Customized } from 'recharts';
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

  console.log('Chart Data:', {
    displayMode,
    dataLength: data.length,
    firstPoint: data[0],
    lastPoint: data[data.length - 1],
    meanScore: MEAN_SCORE,
    domain: [0, 300]
  });

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
          scale="linear"
          allowDataOverflow
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
          scale="linear"
          allowDataOverflow
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
        
        <Customized component={({ width, height, xAxis, yAxis }) => {
          console.log('Customized component props:', {
            hasWidth: !!width,
            hasHeight: !!height,
            xAxisDetails: {
              hasScale: !!xAxis?.scale,
              scaleType: xAxis?.scale?.name,
              domain: xAxis?.domain,
              bandwidth: xAxis?.bandwidth?.(),
              range: xAxis?.range?.(),
              ticks: xAxis?.ticks?.()
            },
            yAxisDetails: {
              hasScale: !!yAxis?.scale,
              scaleType: yAxis?.scale?.name,
              domain: yAxis?.domain,
              bandwidth: yAxis?.bandwidth?.(),
              range: yAxis?.range?.(),
              ticks: yAxis?.ticks?.()
            }
          });

          const x = xAxis?.scale ? xAxis.scale(MEAN_SCORE) : (width || 0) * (MEAN_SCORE / 300);
          const lineStartY = height; // Start from the very bottom
          const lineEndY = lineStartY - 260; // Keep same length

          console.log('Mean Line Coordinates:', {
            meanScore: MEAN_SCORE,
            x,
            width,
            height,
            lineStartY,
            lineEndY,
            scale: xAxis?.scale?.name
          });

          return (
            <g>
              <line 
                x1={x} 
                x2={x} 
                y1={lineStartY}
                y2={lineEndY}
                stroke="#374151" 
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />
              <text
                x={x}
                y={30}
                fill="#374151"
                fontSize={14}
                textAnchor="middle"
              >
                Mean: {MEAN_SCORE}
              </text>
            </g>
          );
        }} />

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
