import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMemo, memo } from 'react';

interface DataPoint {
  date: string;
  score: number;
  color: string;
}

// Extended props interface to include all required Recharts properties
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
}

const CustomDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  return <circle cx={cx} cy={cy} r={6} fill={payload.color} />;
});
CustomDot.displayName = 'CustomDot';

const CustomActiveDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  return <circle cx={cx} cy={cy} r={8} fill={payload.color} />;
});
CustomActiveDot.displayName = 'CustomActiveDot';

interface PerformanceTrackingContainerProps {
  examStep?: 'step1' | 'step2';
}

const PerformanceTrackingContainer = ({ examStep = 'step2' }: PerformanceTrackingContainerProps) => {
  const getStrokeColor = (score: number) => {
    if (examStep === 'step1') {
      if (score >= 231) return '#22c55e';
      if (score >= 196) return '#F97316';
      return '#ea384c';
    } else {
      if (score >= 265) return '#019444';
      if (score >= 249) return '#22c55e';
      if (score >= 214) return '#F97316';
      return '#ea384c';
    }
  };

  // Memoize the data array to prevent unnecessary recalculations
  const data: DataPoint[] = useMemo(() => {
    if (examStep === 'step1') {
      return [{
        date: 'Feb 12',
        score: 188,
        color: getStrokeColor(188)
      }, {
        date: 'Feb 19',
        score: 194,
        color: getStrokeColor(194)
      }, {
        date: 'Feb 26',
        score: 212,
        color: getStrokeColor(212)
      }, {
        date: 'Mar 4',
        score: 228,
        color: getStrokeColor(228)
      }, {
        date: 'Mar 11',
        score: 235,
        color: getStrokeColor(235)
      }];
    } else {
      return [{
        date: 'Feb 12',
        score: 204,
        color: getStrokeColor(204)
      }, {
        date: 'Feb 19',
        score: 244,
        color: getStrokeColor(244)
      }, {
        date: 'Feb 26',
        score: 238,
        color: getStrokeColor(238)
      }, {
        date: 'Mar 4',
        score: 248,
        color: getStrokeColor(248)
      }, {
        date: 'Mar 11',
        score: 262,
        color: getStrokeColor(262)
      }];
    }
  }, [examStep]); // Add examStep as dependency

  // Memoize reference line values to ensure they update with examStep
  const referenceLines = useMemo(() => ({
    passing: {
      value: examStep === 'step1' ? 196 : 214,
      label: examStep === 'step1' ? 'Passing Standard (196)' : 'Passing standard (214)'
    },
    mean: {
      value: examStep === 'step1' ? 231 : 249,
      label: examStep === 'step1' ? 'National mean before 2022 (231)' : 'National mean (249)'
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
              <Line 
                type="monotone"
                dataKey="score" 
                stroke="#5a7183"
                strokeWidth={3} 
                dot={<CustomDot />} 
                activeDot={<CustomActiveDot />}
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
