
import { examStepType } from "@/utils/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SinglePagePerformanceTrackingProps {
  examStep: examStepType;
}

const SinglePagePerformanceTracking = ({ examStep }: SinglePagePerformanceTrackingProps) => {
  const mainPoints = examStep === 'step1' ? [
    { date: 'Feb 12', score: 203, isMainPoint: true },
    { date: 'Feb 19', score: 218, isMainPoint: true },
    { date: 'Feb 26', score: 225, isMainPoint: true },
    { date: 'Mar 4', score: 232, isMainPoint: true },
    { date: 'Mar 11', score: 245, isMainPoint: true }
  ] : [
    { date: 'Feb 12', score: 220, isMainPoint: true },
    { date: 'Feb 19', score: 235, isMainPoint: true },
    { date: 'Feb 26', score: 242, isMainPoint: true },
    { date: 'Mar 4', score: 248, isMainPoint: true },
    { date: 'Mar 11', score: 260, isMainPoint: true }
  ];

  const projectedPoints = examStep === 'step1' ? [
    { date: 'Mar 18', score: 252, isProjected: true },
    { date: 'Mar 25', score: 259, isProjected: true },
    { date: 'Apr 1', score: 266, isProjected: true }
  ] : [
    { date: 'Mar 18', score: 267, isProjected: true },
    { date: 'Mar 25', score: 274, isProjected: true },
    { date: 'Apr 1', score: 281, isProjected: true }
  ];

  const data = [...mainPoints, ...projectedPoints];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 font-lato">Performance tracking</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" domain={['dataMin - 20', 'dataMax + 20']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={(props) => {
                const isMainPoint = data[props.index]?.isMainPoint;
                const isProjected = data[props.index]?.isProjected;
                if (isProjected) {
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      stroke="#4F46E5"
                      strokeWidth={2}
                      fill="white"
                    />
                  );
                }
                if (isMainPoint) {
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      stroke="#4F46E5"
                      fill="#4F46E5"
                    />
                  );
                }
                return null;
              }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SinglePagePerformanceTracking;
