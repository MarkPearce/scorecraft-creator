
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { MEAN_SCORE } from '@/utils/distributionUtils';

interface DistributionChartProps {
  data: any[];
  displayMode: "normal" | "percentile";
  studentScore: number;
  studentPercentile: number;
  peerGroup: "all" | "same-objective" | "same-state" | "same-school";
}

const peerGroupPercentiles = {
  "all": 47,
  "same-objective": 52,
  "same-state": 58,
  "same-school": 67
};

const peerGroupLabels = {
  "all": "All AMBOSS",
  "same-objective": "Same Learning Objective",
  "same-state": "Same State",
  "same-school": "Same School"
};

const DistributionChart = ({ 
  data, 
  displayMode, 
  studentScore, 
  studentPercentile,
  peerGroup = "all"
}: DistributionChartProps) => {
  const xAxisTicks = [0, 25, 50, 75, 100];
  const currentPeerGroupPercentile = peerGroupPercentiles[peerGroup];
  
  console.log('Chart Data:', {
    displayMode,
    dataLength: data.length,
    firstPoint: data[0],
    lastPoint: data[data.length - 1],
    meanScore: MEAN_SCORE,
    domain: [0, 100],
    peerGroup,
    currentPeerGroupPercentile
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart 
        data={data} 
        margin={{
          top: 56,
          right: 30,
          left: 20,
          bottom: 20
        }}
      >
        <defs>
          <linearGradient id="distributionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0aa6b8" stopOpacity={0.3} />
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
        <Tooltip 
          formatter={(value: number) => 
            [displayMode === "normal" 
              ? `Density: ${value.toFixed(4)}` 
              : `Percentile: ${value.toFixed(1)}%`
            ]
          }
          labelFormatter={(label) => `Score: ${label}`}
        />
        <Area
          type="monotone"
          dataKey={displayMode === "normal" ? "density" : "percentile"}
          stroke="#0aa6b8"
          strokeWidth={2}
          fill="url(#distributionGradient)"
          dot={false}
          isAnimationActive={false}
        />
        
        {/* Student's score reference line */}
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
        
        {/* Peer group percentile reference line */}
        <ReferenceLine
          x={currentPeerGroupPercentile}
          stroke="#1f2937"
          strokeWidth={2}
          label={{
            value: `${currentPeerGroupPercentile}th Percentile`,
            position: 'top',
            fill: '#1f2937',
            fontSize: 14,
            dy: -16
          }}
          y1={0}
          y2={1}
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
