
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  { date: '3/1', score: 45, color: '#ea384c' },
  { date: '3/8', score: 72, color: '#F97316' },
  { date: '3/15', score: 68, color: '#F97316' },
  { date: '3/22', score: 75, color: '#22c55e' },
  { date: '3/29', score: 85, color: '#22c55e' },
];

const Concept1 = () => {
  const navigate = useNavigate();

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill={payload.color} 
      />
    );
  };

  const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6} 
        fill={payload.color} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Concept 1: Performance Tracking</h1>
            <div className="text-sm text-gray-600 space-y-1">
              <p>250 Questions taken in to account</p>
              <p>Last updated 1 week ago</p>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Score']}
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
        </div>
      </div>
    </div>
  );
};

export default Concept1;
