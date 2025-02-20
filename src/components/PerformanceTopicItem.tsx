
import { PerformanceItem } from '@/utils/performanceData';
import ClippedText from './ClippedText';

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
          <ClippedText text={item.subject} className="max-w-[80%]" />
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
      <td className="col-span-7 py-2 font-medium text-gray-900">
        <ClippedText text={item.subject} />
      </td>
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
