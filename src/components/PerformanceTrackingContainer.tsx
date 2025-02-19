
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMemo } from 'react';
import { PerformanceTrackingContainerProps, DataPoint } from './performance-tracking/types';
import { getStrokeColor, generateIntermediatePoints } from './performance-tracking/utils';
import { CustomDot, CustomActiveDot } from './performance-tracking/CustomDots';

const PerformanceTrackingContainer = ({ examStep = 'step2' }: PerformanceTrackingContainerProps) => {
  const data: DataPoint[] = useMemo(() => {
    const mainPoints = examStep === 'step1' ? [
      { date: 'Feb 12', score: 190, color: getStrokeColor(190, examStep), isMainPoint: true },
      { date: 'Feb 19', score: 203, color: getStrokeColor(203, examStep), isMainPoint: true },
      { date: 'Feb 26', score: 221, color: getStrokeColor(221, examStep), isMainPoint: true },
      { date: 'Mar 4', score: 242, color: getStrokeColor(242, examStep), isMainPoint: true },
      { date: 'Mar 11', score: 256, color: getStrokeColor(256, examStep), isMainPoint: true }
    ] : [
      { date: 'Feb 12', score: 204, color: getStrokeColor(204, examStep), isMainPoint: true },
      { date: 'Feb 19', score: 244, color: getStrokeColor(244, examStep), isMainPoint: true },
      { date: 'Feb 26', score: 238, color: getStrokeColor(238, examStep), isMainPoint: true },
      { date: 'Mar 4', score: 248, color: getStrokeColor(248, examStep), isMainPoint: true },
      { date: 'Mar 11', score: 262, color: getStrokeColor(262, examStep), isMainPoint: true }
    ];

    const allPoints: DataPoint[] = [];
    for (let i = 0; i < mainPoints.length - 1; i++) {
      allPoints.push(mainPoints[i]);
      const intermediatePoints = generateIntermediatePoints(mainPoints[i], mainPoints[i + 1], examStep);
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
