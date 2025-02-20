
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { MEAN_SCORE } from '@/utils/distributionUtils';
import { PEER_GROUP_LABELS, PEER_GROUP_PERCENTILES, PeerGroupType } from '@/utils/peerGroupConstants';
import { useMemo } from 'react';

interface DistributionChartProps {
  data: Array<{
    score: number;
    density: number;
    percentile: number;
  }>;
  displayMode: "normal" | "percentile";
  studentScore: number;
  studentPercentile: number;
  peerGroup: PeerGroupType;
}

const DistributionChart = ({ 
  data, 
  displayMode, 
  studentScore, 
  studentPercentile,
  peerGroup
}: DistributionChartProps) => {
  // Memoize chart configuration
  const chartConfig = useMemo(() => ({
    xAxisTicks: [0, 25, 50, 75, 100],
    currentPeerGroupPercentile: PEER_GROUP_PERCENTILES[peerGroup],
    currentPeerGroupLabel: PEER_GROUP_LABELS[peerGroup]
  }), [peerGroup]);

  // Memoize tooltip formatter
  const tooltipFormatter = useMemo(() => (
    (value: number) => [
      displayMode === "normal" 
        ? `Density: ${value.toFixed(4)}` 
        : `Percentile: ${value.toFixed(1)}%`
    ]
  ), [displayMode]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart 
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
            <stop offset="0%" stopColor="#0aa6b8" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#0aa6b8" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        
        <XAxis 
          dataKey="score" 
          type="number" 
          domain={[0, 100]}
          ticks={chartConfig.xAxisTicks}
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
          formatter={tooltipFormatter}
          labelFormatter={(label) => `Score: ${label}`}
          position={{ x: 600, y: 0 }}
          coordinate={{ x: 600, y: 0 }}
          cursor={{ stroke: '#0aa6b8', strokeWidth: 1, strokeDasharray: '3 3' }}
          wrapperStyle={{ 
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '8px',
            width: '160px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          contentStyle={{
            border: 'none',
            padding: 0,
            backgroundColor: 'transparent'
          }}
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
          x={chartConfig.currentPeerGroupPercentile}
          stroke="#5a7183"
          strokeWidth={2}
          strokeDasharray="2 4"
          strokeLinecap="round"
          label={{
            value: `${chartConfig.currentPeerGroupPercentile}th Percentile`,
            position: 'top',
            fill: '#5a7183',
            fontSize: 14,
            fontWeight: 700
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
