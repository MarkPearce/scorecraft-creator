import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMemo, memo } from 'react';

interface DataPoint {
  date: string;
  score: number;
  color: string;
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

const CustomDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  const radius = payload.isMainPoint ? 6 : 3;
  return <circle cx={cx} cy={cy} r={radius} fill={payload.color} />;
});
CustomDot.displayName = 'CustomDot';

const CustomActiveDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  const radius = payload.isMainPoint ? 8 : 4;
  return <circle cx={cx} cy={cy} r={radius} fill={payload.color} />;
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

  const generateIntermediatePoints = (start: DataPoint, end: DataPoint, count: number): DataPoint[] => {
    const points: DataPoint[] = [];
    const dateStart = new Date(start.date);
    const dateEnd = new Date(end.date);
    const totalDays = (dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24);
    
    // Generate a random number of points between 1 and 4
    const numPoints = Math.floor(Math.random() * 4) + 1;
    
    for (let i = 0; i < numPoints; i++) {
      // Generate random position along the line segment (0 to 1)
      const position = Math.random();
      
      // Calculate score with some random variation
      const baseScore = start.score + (end.score - start.score) * position;
      const score = Math.round(baseScore + (Math.random() * 8 - 4));
      
      points.push({
        date: '',
        score,
        color: getStrokeColor(score),
        isMainPoint: false
      });
    }
    
    // Sort points by their scores to maintain visual consistency
    return points.sort((a, b) => a.score - b.score);
  };

  const data: DataPoint[] = useMemo(() => {
    const mainPoints = examStep === 'step1' ? [
      { date: 'Feb 5', score: 190, color: getStrokeColor(190), isMainPoint: true },
      { date: 'Feb 12', score: 203, color: getStrokeColor(203), isMainPoint: true },
      { date: 'Feb 19', score: 221, color: getStrokeColor(221), isMainPoint: true },
      { date: 'Feb 26', score: 242, color: getStrokeColor(242), isMainPoint: true },
      { date: 'Mar 4', score: 256, color: getStrokeColor(256), isMainPoint: true }
    ] : [
      { date: 'Feb 5', score: 204, color: getStrokeColor(204), isMainPoint: true },
      { date: 'Feb 12', score: 244, color: getStrokeColor(244), isMainPoint: true },
      { date: 'Feb 19', score: 238, color: getStrokeColor(238), isMainPoint: true },
      { date: 'Feb 26', score: 248, color: getStrokeColor(248), isMainPoint: true },
      { date: 'Mar 4', score: 262, color: getStrokeColor(262), isMainPoint: true }
    ];

    const allPoints: DataPoint[] = [];
    for (let i = 0; i < mainPoints.length - 1; i++) {
      allPoints.push(mainPoints[i]);
      const intermediatePoints = generateIntermediatePoints(
        mainPoints[i],
        mainPoints[i + 1],
        2 // Number of intermediate points between main points
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
