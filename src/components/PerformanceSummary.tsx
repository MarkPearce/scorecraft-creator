
import { BarChart } from 'lucide-react';

interface PerformanceItem {
  subject: string;
  percentageRange: string;
  performance: 'lower' | 'same' | 'higher';
}

const performanceData: PerformanceItem[] = [
  { subject: "Pathology", percentageRange: "45-55%", performance: "same" },
  { subject: "Physiology", percentageRange: "30-40%", performance: "higher" },
  { subject: "Gross Anatomy & Embryology", percentageRange: "10-20%", performance: "higher" },
  { subject: "Microbiology", percentageRange: "10-20%", performance: "lower" },
  { subject: "Pharmacology", percentageRange: "10-20%", performance: "lower" },
  { subject: "Behavioral Sciences", percentageRange: "10-15%", performance: "higher" },
  { subject: "Biochemistry & Nutrition", percentageRange: "5-15%", performance: "higher" },
  { subject: "Histology & Cell Biology", percentageRange: "5-15%", performance: "higher" },
  { subject: "Immunology", percentageRange: "5-15%", performance: "higher" },
  { subject: "Genetics", percentageRange: "5-10%", performance: "higher" }
];

const PerformanceSummary = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Your Relative Strengths and Weaknesses</h2>
      <div className="space-y-3">
        {performanceData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded-lg px-3"
          >
            <div className="flex items-center space-x-3 flex-1">
              <span className="font-medium text-gray-900">{item.subject}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 w-20 text-right">
                {item.percentageRange}
              </span>
              <div
                className={`px-3 py-1 rounded-full text-sm min-w-[80px] text-center ${
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
        ))}
      </div>
    </div>
  );
};

export default PerformanceSummary;
