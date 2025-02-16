import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [{
  date: 'Wk 7',
  score: 204,
  color: '#ea384c'
},
{
  date: 'Wk 8',
  score: 244,
  color: '#F97316'
},
{
  date: 'Wk 9',
  score: 238,
  color: '#F97316'
},
{
  date: 'Wk 10',
  score: 248,
  color: '#22c55e'
},
{
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

const PerformanceTrackingContainer = () => {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle>Performance tracking</CardTitle>
        <CardDescription>
          <div className="text-sm text-gray-600 space-y-1">
            <p>250 Questions taken in to account</p>
            <p>Last updated 1 week ago</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{
              top: 20,
              right: 30,
              left: 50,
              bottom: 40
            }}>
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
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ea384c" />
                  <stop offset="24.99%" stopColor="#ea384c" />
                  <stop offset="25%" stopColor="#F97316" />
                  <stop offset="74.99%" stopColor="#F97316" />
                  <stop offset="75%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
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
