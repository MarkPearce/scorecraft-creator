
interface PerformanceItem {
  subject: string;
  performance: 'lower' | 'same' | 'higher';
}

export const performanceData: PerformanceItem[] = [
  { subject: "Pathology", performance: "lower" },
  { subject: "Physiology", performance: "lower" },
  { subject: "Gross Anatomy & Embryology", performance: "same" },
  { subject: "Microbiology", performance: "lower" },
  { subject: "Pharmacology", performance: "lower" },
  { subject: "Behavioral Sciences", performance: "same" },
  { subject: "Biochemistry & Nutrition", performance: "higher" },
  { subject: "Histology & Cell Biology", performance: "higher" },
  { subject: "Immunology", performance: "same" },
  { subject: "Genetics", performance: "higher" }
];

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
        <span>{item.subject}</span>
      </div>
    );
  }

  return (
    <tr 
      className="hover:bg-gray-50 transition-colors cursor-pointer grid grid-cols-12 gap-4 mt-2"
      onClick={() => onClick(item.subject)}
    >
      <td className="col-span-9 py-2 font-medium text-gray-900">{item.subject}</td>
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
