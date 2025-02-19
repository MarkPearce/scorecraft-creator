
interface PerformanceItem {
  subject: string;
  performance: 'lower' | 'same' | 'higher';
  percentageCorrect: number;
}

// Original Step 1 data
export const performanceData: PerformanceItem[] = [
  { subject: "Pathology", performance: "lower", percentageCorrect: 58 },
  { subject: "Physiology", performance: "lower", percentageCorrect: 57 },
  { subject: "Gross Anatomy & Embryology", performance: "same", percentageCorrect: 71 },
  { subject: "Microbiology", performance: "lower", percentageCorrect: 55 },
  { subject: "Pharmacology", performance: "lower", percentageCorrect: 60 },
  { subject: "Behavioral Sciences", performance: "same", percentageCorrect: 73 },
  { subject: "Biochemistry & Nutrition", performance: "higher", percentageCorrect: 85 },
  { subject: "Histology & Cell Biology", performance: "higher", percentageCorrect: 82 },
  { subject: "Immunology", performance: "same", percentageCorrect: 70 },
  { subject: "Genetics", performance: "higher", percentageCorrect: 80 }
];

// Step 2 data organized by category
export const step2Data: {
  tasks: PerformanceItem[];
  systems: PerformanceItem[];
  disciplines: PerformanceItem[];
} = {
  tasks: [
    { subject: "PC: Diagnosis", performance: "lower", percentageCorrect: 58 },
    { subject: "PC: Pharmacotherapy", performance: "same", percentageCorrect: 71 },
    { subject: "PC: Health Maintenance", performance: "higher", percentageCorrect: 82 },
    { subject: "Ethics/Professionalism", performance: "lower", percentageCorrect: 60 },
    { subject: "Systems-Based Practice", performance: "same", percentageCorrect: 73 }
  ],
  systems: [
    { subject: "Cardiovascular", performance: "higher", percentageCorrect: 85 },
    { subject: "Gastrointestinal", performance: "lower", percentageCorrect: 57 },
    { subject: "Respiratory", performance: "same", percentageCorrect: 70 },
    { subject: "Musculoskeletal", performance: "higher", percentageCorrect: 82 },
    { subject: "Neurological", performance: "lower", percentageCorrect: 55 }
  ],
  disciplines: [
    { subject: "Medicine", performance: "higher", percentageCorrect: 82 },
    { subject: "Surgery", performance: "lower", percentageCorrect: 55 },
    { subject: "Pediatrics", performance: "same", percentageCorrect: 73 },
    { subject: "Obstetrics & Gynecology", performance: "higher", percentageCorrect: 80 },
    { subject: "Psychiatry", performance: "lower", percentageCorrect: 60 }
  ]
};

interface PerformanceTopicItemProps {
  item: PerformanceItem;
  onClick: (subject: string) => void;
  view: 'grouped' | 'list';
}

const PerformanceTopicItem = ({ item, onClick, view }: PerformanceTopicItemProps) => {
  if (view === 'grouped') {
    return (
      <div
        onClick={() => onClick(item.subject)}
        className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
          item.performance === 'higher'
            ? 'bg-green-50 text-green-600 hover:bg-green-100'
            : item.performance === 'lower'
            ? 'bg-red-50 text-red-600 hover:bg-red-100'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <div className="flex justify-between items-center">
          <span>{item.subject}</span>
          <span className="ml-2">{item.percentageCorrect}%</span>
        </div>
      </div>
    );
  }

  return (
    <tr 
      className="hover:bg-gray-50 transition-colors cursor-pointer grid grid-cols-12 gap-4 mt-2"
      onClick={() => onClick(item.subject)}
    >
      <td className="col-span-7 py-2 font-medium text-gray-900">{item.subject}</td>
      <td className="col-span-2 py-2 text-right pr-4">
        <span className="text-gray-600">{item.percentageCorrect}%</span>
      </td>
      <td className="col-span-3 py-2">
        <div className="flex justify-center">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.performance === 'higher'
                ? 'bg-green-50 text-green-600'
                : item.performance === 'lower'
                ? 'bg-red-50 text-red-600'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            {item.performance.charAt(0).toUpperCase() + item.performance.slice(1)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default PerformanceTopicItem;
