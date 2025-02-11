
import { BarChart } from 'lucide-react';

interface PerformanceItem {
  subject: string;
  performance: 'lower' | 'same' | 'higher';
}

const performanceData: PerformanceItem[] = [
  { subject: "Pathology", performance: "same" },
  { subject: "Physiology", performance: "higher" },
  { subject: "Gross Anatomy & Embryology", performance: "higher" },
  { subject: "Microbiology", performance: "lower" },
  { subject: "Pharmacology", performance: "lower" },
  { subject: "Behavioral Sciences", performance: "higher" },
  { subject: "Biochemistry & Nutrition", performance: "higher" },
  { subject: "Histology & Cell Biology", performance: "higher" },
  { subject: "Immunology", performance: "higher" },
  { subject: "Genetics", performance: "higher" }
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
        ))}
      </div>
    </div>
  );
};

export default PerformanceSummary;
