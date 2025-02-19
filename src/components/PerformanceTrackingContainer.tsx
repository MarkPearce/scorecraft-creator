
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
}

const generateIntermediatePoints = (start: DataPoint, end: DataPoint, count: number): DataPoint[] => {
  const points: DataPoint[] = [];
  const dateStart = new Date(start.date);
  const dateEnd = new Date(end.date);
  const dayDiff = (dateEnd.getTime() - dateStart.getTime()) / (count + 1);
  const scoreDiff = (end.score - start.score) / (count + 1);

  for (let i = 1; i <= count; i++) {
    const date = new Date(dateStart.getTime() + dayDiff * i);
    const score = Math.round(start.score + scoreDiff * i + (Math.random() * 6 - 3));
    points.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score,
      isMainPoint: false
    });
  }
  return points;
};

const CustomDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  const radius = payload.isMainPoint ? 6 : 3;
  const color = payload.isMainPoint ? '#5a7183' : '#94a3b8';
  return <circle cx={cx} cy={cy} r={radius} fill={color} />;
});
CustomDot.displayName = 'CustomDot';

const CustomActiveDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  const radius = payload.isMainPoint ? 8 : 4;
  const color = payload.isMainPoint ? '#5a7183' : '#94a3b8';
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

    const allPoints: DataPoint[] = [];
    for (let i = 0; i < mainPoints.length - 1; i++) {
      allPoints.push(mainPoints[i]);
      const intermediatePoints = generateIntermediatePoints(
        mainPoints[i],
        mainPoints[i + 1],
        2
      );
      allPoints.push(...intermediatePoints);
    }
    allPoints.push(mainPoints[mainPoints.length - 1]);

    return allPoints;
  }, [examStep]);

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
