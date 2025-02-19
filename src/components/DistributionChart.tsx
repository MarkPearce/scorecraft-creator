
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Area } from 'recharts';
import { MEAN_SCORE } from '@/utils/distributionUtils';

interface DistributionChartProps {
  data: any[];
  displayMode: "normal" | "percentile";
  studentScore: number;
  studentPercentile: number;
}

const DistributionChart = ({ data, displayMode, studentScore, studentPercentile }: DistributionChartProps) => {
  const xAxisTicks = [0, 25, 50, 75, 100];
  
  console.log('Chart Data:', {
    displayMode,
    dataLength: data.length,
    firstPoint: data[0],
    lastPoint: data[data.length - 1],
    meanScore: MEAN_SCORE,
    domain: [0, 100]
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart 
        data={data} 
        margin={{
          top: 40,
          right: 30,
          left: 20,
          bottom: 20
        }}
      >
        <defs>
          <linearGradient id="distributionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0aa6b8" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#0aa6b8" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="score" 
          type="number" 
          domain={[0, 100]}
          ticks={xAxisTicks}
          interval={0}
          tick={{
            fontSize: 11,
            dy: 10,
            fill: "#6b7280"
          }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          hide={true}
          domain={[0, 'auto']}
        />
        <Area
          type="basis"
          dataKey={displayMode === "normal" ? "density" : "percentile"}
          stroke="#0aa6b8"
          strokeWidth={2}
          fill="url(#distributionGradient)"
          dot={false}
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
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DistributionChart;
