
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMemo, memo } from 'react';

interface DataPoint {
  date: string;
  score: number;
  isMainPoint?: boolean;
}

interface DotProps {
  cx?: number;
  cy?: number;
  r?: number;
  payload?: DataPoint;
  value?: number;
  index?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  examStep?: 'step1' | 'step2';
}

const getDotColor = (score: number, examStep: 'step1' | 'step2'): string => {
  if (examStep === 'step2') {
    if (score >= 265) return '#019444'; // dark green
    if (score >= 249) return '#22c55e'; // light green
    if (score >= 214) return '#fbbf24'; // yellow - keeping #fbbf24 as #FFC205 isn't in our color system
    return '#ea384c'; // red
  } else {
    // Step 1 logic
    if (score >= 265) return '#019444'; // dark green
    if (score >= 231) return '#22c55e'; // light green - at or above national mean
    if (score >= 196) return '#fbbf24'; // yellow - at or above passing standard
    return '#ea384c'; // red - below passing standard
  }
};

const CustomDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload, examStep = 'step2' } = props;
  if (!payload) return null;
  const radius = 6;  // All dots now have the same size since we only have main points
  const color = getDotColor(payload.score, examStep);
  return <circle cx={cx} cy={cy} r={radius} fill={color} />;
});
CustomDot.displayName = 'CustomDot';

const CustomActiveDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload, examStep = 'step2' } = props;
  if (!payload) return null;
  const radius = 8;  // All active dots now have the same size
  const color = getDotColor(payload.score, examStep);
  return <circle cx={cx} cy={cy} r={radius} fill={color} />;
});
CustomActiveDot.displayName = 'CustomActiveDot';

interface PerformanceTrackingContainerProps {
  examStep?: 'step1' | 'step2';
}

const PerformanceTrackingContainer = ({ examStep = 'step2' }: PerformanceTrackingContainerProps) => {
  const data: DataPoint[] = useMemo(() => {
    const mainPoints = examStep === 'step1' ? [
      { date: 'Feb 12', score: 190, isMainPoint: true },
      { date: 'Feb 19', score: 203, isMainPoint: true },
      { date: 'Feb 26', score: 221, isMainPoint: true },
      { date: 'Mar 4', score: 242, isMainPoint: true },
      { date: 'Mar 11', score: 256, isMainPoint: true }
    ] : [
      { date: 'Feb 12', score: 204, isMainPoint: true },
      { date: 'Feb 19', score: 244, isMainPoint: true },
      { date: 'Feb 26', score: 238, isMainPoint: true },
      { date: 'Mar 4', score: 248, isMainPoint: true },
      { date: 'Mar 11', score: 262, isMainPoint: true }
    ];

    return mainPoints;  // Return only the main points without generating intermediates
  }, [examStep]);

  const referenceLines = useMemo(() => ({
    passing: {
      value: examStep === 'step1' ? 196 : 214,
      label: examStep === 'step1' ? 'Passing Standard (196)' : 'Passing standard (214)'
    },
    mean: {
      value: examStep === 'step1' ? 231 : 249,
      label: examStep === 'step1' ? 'National mean before 2022 (231)' : 'National mean (249)'
    },
    target: {
      value: 260,
      label: 'Target score (260)'
    }
  }), [examStep]);

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-lato">Performance over time</CardTitle>
        <CardDescription>
          <div className="text-sm text-gray-600 space-y-1 font-lato">
            
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{
                top: 20,
                right: 30,
                left: 50,
                bottom: 40
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                label={{
                  value: '2025',
                  position: 'bottom',
                  offset: 10,
                  style: {
                    fontWeight: 'bold',
                    fontSize: 'base'
                  }
                }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                domain={[180, 300]}
                ticks={[180, 200, 220, 240, 260, 280, 300]}
                label={{
                  value: 'Score',
                  angle: -90,
                  position: 'left',
                  style: {
                    fontWeight: 'bold',
                    fontSize: 'base'
                  }
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '8px'
                }}
                formatter={(value: number) => [`${value}`, 'Score']}
              />
              <ReferenceLine 
                key={`passing-${referenceLines.passing.value}`}
                y={referenceLines.passing.value} 
                stroke="#ea384c" 
                label={{ 
                  value: referenceLines.passing.label, 
                  position: 'insideBottomRight',
                  fill: '#64748b',
                  fontSize: 12,
                  dy: 18
                }} 
              />
              <ReferenceLine 
                key={`mean-${referenceLines.mean.value}`}
                y={referenceLines.mean.value} 
                stroke="#22c55e" 
                label={{ 
                  value: referenceLines.mean.label, 
                  position: 'insideBottomRight',
                  fill: '#64748b',
                  fontSize: 12,
                  dy: 18
                }} 
              />
              <ReferenceLine 
                key={`target-${referenceLines.target.value}`}
                y={referenceLines.target.value} 
                stroke="#295dae" 
                label={{ 
                  value: referenceLines.target.label, 
                  position: 'insideBottomRight',
                  fill: '#64748b',
                  fontSize: 12,
                  dy: 18
                }} 
              />
              <Line 
                type="monotone"
                dataKey="score" 
                stroke="#5a7183"
                strokeWidth={3} 
                dot={<CustomDot examStep={examStep} />} 
                activeDot={<CustomActiveDot examStep={examStep} />}
                connectNulls
                fill="none"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrackingContainer;
