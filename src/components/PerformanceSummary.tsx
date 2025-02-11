
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
  const lowerPerformance = performanceData.filter(item => item.performance === 'lower');
  const samePerformance = performanceData.filter(item => item.performance === 'same');
  const higherPerformance = performanceData.filter(item => item.performance === 'higher');

  const Column = ({ title, items }: { title: string; items: PerformanceItem[] }) => (
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              item.performance === 'higher'
                ? 'bg-green-50 text-green-600'
                : item.performance === 'lower'
                ? 'bg-red-50 text-red-600'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            {item.subject}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Your Relative Strengths and Weaknesses</h2>
      <div className="flex gap-6">
        <Column title="Lower" items={lowerPerformance} />
        <Column title="Same" items={samePerformance} />
        <Column title="Higher" items={higherPerformance} />
      </div>
    </div>
  );
};

export default PerformanceSummary;
