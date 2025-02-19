
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomDot, CustomActiveDot } from './performance-tracking/CustomDots';
import { usePerformanceData } from './performance-tracking/usePerformanceData';
import { PerformanceTrackingContainerProps } from './performance-tracking/types';

const PerformanceTrackingContainer = ({ examStep = 'step2' }: PerformanceTrackingContainerProps) => {
  const { data, referenceLines } = usePerformanceData(examStep);

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-lato">Performance over time</CardTitle>
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
              {examStep === 'step2' && (
                <>
                  <ReferenceLine 
                    y={referenceLines.passing?.value} 
                    stroke="#ea384c" 
                    label={{ 
                      value: referenceLines.passing?.label, 
                      position: 'insideBottomRight',
                      fill: '#64748b',
                      fontSize: 12,
                      dy: 18
                    }} 
                  />
                  <ReferenceLine 
                    y={referenceLines.mean?.value} 
                    stroke="#22c55e" 
                    label={{ 
                      value: referenceLines.mean?.label, 
                      position: 'insideBottomRight',
                      fill: '#64748b',
                      fontSize: 12,
                      dy: 18
                    }} 
                  />
                  <ReferenceLine 
                    y={referenceLines.target?.value} 
                    stroke="#295dae" 
                    label={{ 
                      value: referenceLines.target?.label, 
                      position: 'insideBottomRight',
                      fill: '#64748b',
                      fontSize: 12,
                      dy: 18
                    }} 
                  />
                </>
              )}
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
