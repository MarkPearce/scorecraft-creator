
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [{
  date: 'Wk 7',
  score: 204,
  color: '#ea384c'
}, {
  date: 'Wk 8',
  score: 244,
  color: '#F97316'
}, {
  date: 'Wk 9',
  score: 238,
  color: '#F97316'
}, {
  date: 'Wk 10',
  score: 248,
  color: '#22c55e'
}, {
  date: 'Wk 11',
  score: 262,
  color: '#22c55e'
}];

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return <circle cx={cx} cy={cy} r={4} fill={payload.color} />;
};

const CustomActiveDot = (props: any) => {
  const { cx, cy, payload } = props;
  return <circle cx={cx} cy={cy} r={6} fill={payload.color} />;
};

interface PerformanceTrackingContainerProps {
  examStep?: 'step1' | 'step2';
}

const PerformanceTrackingContainer = ({ examStep = 'step2' }: PerformanceTrackingContainerProps) => {
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
                  value: 'Week (2025)',
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
              {examStep === 'step1' ? (
                <>
                  <ReferenceLine 
                    y={196} 
                    stroke="#ea384c" 
                    label={{ 
                      value: 'Passing Standard (196)', 
                      position: 'insideBottomRight',
                      fill: '#64748b',
                      fontSize: 12,
                      dy: 18
                    }} 
                  />
                  <ReferenceLine 
                    y={231} 
                    stroke="#22c55e" 
                    label={{ 
                      value: 'National mean before 2022 (231)', 
                      position: 'insideBottomRight',
                      fill: '#64748b',
                      fontSize: 12,
                      dy: 18
                    }} 
                  />
                </>
              ) : (
                <>
                  <ReferenceLine 
                    y={214} 
                    stroke="#ea384c" 
                    label={{ 
                      value: 'Passing standard (214)', 
                      position: 'insideBottomRight',
                      fill: '#64748b',
                      fontSize: 12,
                      dy: 18
                    }} 
                  />
                  <ReferenceLine 
                    y={249} 
                    stroke="#22c55e" 
                    label={{ 
                      value: 'National mean (249)', 
                      position: 'insideBottomRight',
                      fill: '#64748b',
                      fontSize: 12,
                      dy: 18
                    }} 
                  />
                </>
              )}
              <defs>
                <rect id="gradientBox" x="0" y="0" width="100%" height="100%" fill="url(#lineGradient)" />
                {examStep === 'step1' ? (
                  <linearGradient id="lineGradient" x1="0" y1="1" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset={180 / 300} stopColor="#ea384c" />
                    <stop offset={196 / 300} stopColor="#ea384c" />
                    <stop offset={196 / 300} stopColor="#F97316" />
                    <stop offset={231 / 300} stopColor="#F97316" />
                    <stop offset={231 / 300} stopColor="#22c55e" />
                    <stop offset="1" stopColor="#22c55e" />
                  </linearGradient>
                ) : (
                  <linearGradient id="lineGradient" x1="0" y1="1" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset={180 / 300} stopColor="#ea384c" />
                    <stop offset={214 / 300} stopColor="#ea384c" />
                    <stop offset={214 / 300} stopColor="#F97316" />
                    <stop offset={249 / 300} stopColor="#F97316" />
                    <stop offset={249 / 300} stopColor="#22c55e" />
                    <stop offset={265 / 300} stopColor="#22c55e" />
                    <stop offset={265 / 300} stopColor="#019444" />
                    <stop offset="1" stopColor="#019444" />
                  </linearGradient>
                )}
              </defs>
              <Line 
                type="linear" 
                dataKey="score" 
                stroke="url(#lineGradient)" 
                strokeWidth={3} 
                dot={<CustomDot />} 
                activeDot={<CustomActiveDot />} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrackingContainer;
