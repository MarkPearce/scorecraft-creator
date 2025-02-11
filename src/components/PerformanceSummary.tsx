
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

  const PerformanceColumn = ({ items, type, label }: { 
    items: PerformanceItem[], 
    type: 'lower' | 'same' | 'higher',
    label: string 
  }) => (
    <div className="flex-1">
      <div className={`mb-4 px-3 py-1 rounded-full text-sm font-medium inline-block
        ${type === 'higher' ? 'bg-green-50 text-green-600' : 
          type === 'lower' ? 'bg-red-50 text-red-600' : 
          'bg-gray-50 text-gray-600'}`}
      >
        {label}
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div 
            key={index}
            className="p-2 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
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
        <PerformanceColumn 
          items={lowerPerformance} 
          type="lower"
          label="Lower"
        />
        <PerformanceColumn 
          items={samePerformance} 
          type="same"
          label="Same"
        />
        <PerformanceColumn 
          items={higherPerformance} 
          type="higher"
          label="Higher"
        />
      </div>
    </div>
  );
};

export default PerformanceSummary;
