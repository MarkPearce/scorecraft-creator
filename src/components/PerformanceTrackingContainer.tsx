
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface DataPoint {
  date: string;
  score: number;
  color: string;
}

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

  const data: DataPoint[] = [{
    date: 'Wk 7',
    score: 204,
    color: getStrokeColor(204)
  }, {
    date: 'Wk 8',
    score: 244,
    color: getStrokeColor(244)
  }, {
    date: 'Wk 9',
    score: 238,
    color: getStrokeColor(238)
  }, {
    date: 'Wk 10',
    score: 248,
    color: getStrokeColor(248)
  }, {
    date: 'Wk 11',
    score: 262,
    color: getStrokeColor(262)
  }];

  // Calculate percentage positions for gradient stops based on score ranges
  const getPercentage = (score: number) => {
    // Invert the percentage calculation since SVG gradients go from top to bottom
    return ((300 - score) / (300 - 180) * 100).toFixed(1) + '%';
  };

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
              <Line 
                type="monotone"
                dataKey="score" 
                stroke="#64748b"
                strokeWidth={3} 
                dot={<CustomDot />} 
                activeDot={<CustomActiveDot />}
                connectNulls
                fill="none"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrackingContainer;

