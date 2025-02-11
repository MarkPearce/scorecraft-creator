
import { BarChart } from 'lucide-react';

interface PerformanceItem {
  discipline: string;
  percentage: string;
  items: string;
  performance: 'lower' | 'same' | 'higher';
}

const performanceData: PerformanceItem[] = [
  { discipline: "Medicine", percentage: "44-52%", items: "15-24%", performance: "higher" },
  { discipline: "Surgery", percentage: "25-35%", items: "11-15%", performance: "same" },
  { discipline: "Pediatrics", percentage: "15-22%", items: "7-9%", performance: "lower" },
  { discipline: "Psychiatry", percentage: "11-15%", items: "4-6%", performance: "higher" },
];

const PerformanceSummary = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Your Relative Strengths and Weaknesses</h2>
      <div className="space-y-4">
        {performanceData.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:border-blue-200 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart className="w-5 h-5 text-gray-500" />
                <div>
                  <h3 className="font-medium">{item.discipline}</h3>
                  <p className="text-sm text-gray-500">Items: {item.items}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">{item.percentage}</span>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.performance === 'higher'
                      ? 'bg-green-50 text-green-600'
                      : item.performance === 'lower'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {item.performance.charAt(0).toUpperCase() + item.performance.slice(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSummary;
