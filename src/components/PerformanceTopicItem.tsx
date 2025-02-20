interface PerformanceItem {
  subject: string;
  performance: 'lower' | 'same' | 'higher';
  percentageCorrect: number;
  category: 'Systems' | 'Physician Tasks' | 'Disciplines';
}

export const performanceData: PerformanceItem[] = [
  // Original Step 1 data with Disciplines category
  { subject: "Pathology", performance: "lower", percentageCorrect: 15, category: "Disciplines" },
  { subject: "Physiology", performance: "lower", percentageCorrect: 32, category: "Disciplines" },
  { subject: "Gross Anatomy & Embryology", performance: "same", percentageCorrect: 55, category: "Disciplines" },
  { subject: "Microbiology", performance: "lower", percentageCorrect: 28, category: "Disciplines" },
  { subject: "Pharmacology", performance: "lower", percentageCorrect: 36, category: "Disciplines" },
  { subject: "Behavioral Sciences", performance: "same", percentageCorrect: 65, category: "Disciplines" },
  { subject: "Biochemistry & Nutrition", performance: "higher", percentageCorrect: 85, category: "Disciplines" },
  { subject: "Histology & Cell Biology", performance: "higher", percentageCorrect: 82, category: "Disciplines" },
  { subject: "Immunology", performance: "same", percentageCorrect: 45, category: "Disciplines" },
  { subject: "Genetics", performance: "higher", percentageCorrect: 75, category: "Disciplines" }
];

export const step2PerformanceData: PerformanceItem[] = [
  // Physician Tasks
  { subject: "PC: Diagnosis", performance: "lower", percentageCorrect: 22, category: "Physician Tasks" },
  { subject: "Ethics/Professionalism", performance: "lower", percentageCorrect: 17, category: "Physician Tasks" },
  { subject: "PC: Health Maintenance, Prevention & Surveillance", performance: "higher", percentageCorrect: 82, category: "Physician Tasks" },
  { subject: "PC: Pharmacotherapy, Interventions & Management", performance: "same", percentageCorrect: 55, category: "Physician Tasks" },
  { subject: "Systems-Based Practice/Patient Safety", performance: "same", percentageCorrect: 60, category: "Physician Tasks" },
  
  // Systems
  { subject: "Gastrointestinal System", performance: "lower", percentageCorrect: 12, category: "Systems" },
  { subject: "Behavioral Health", performance: "lower", percentageCorrect: 34, category: "Systems" },
  { subject: "Respiratory System", performance: "same", percentageCorrect: 50, category: "Systems" },
  { subject: "Nervous System & Special Senses", performance: "same", percentageCorrect: 58, category: "Systems" },
  { subject: "Cardiovascular System", performance: "higher", percentageCorrect: 85, category: "Systems" },
  { subject: "Endocrine System", performance: "same", percentageCorrect: 65, category: "Systems" },
  { subject: "Female Reproductive & Breast", performance: "higher", percentageCorrect: 78, category: "Systems" },
  { subject: "Renal & Urinary System & Male Reproductive", performance: "lower", percentageCorrect: 26, category: "Systems" },
  
  // Disciplines
  { subject: "Surgery", performance: "lower", percentageCorrect: 33, category: "Disciplines" },
  { subject: "Multisystem Processes & Disorders", performance: "lower", percentageCorrect: 19, category: "Disciplines" },
  { subject: "Psychiatry", performance: "lower", percentageCorrect: 38, category: "Disciplines" },
  { subject: "Pregnancy, Childbirth & the Puerperium", performance: "same", percentageCorrect: 62, category: "Disciplines" },
  { subject: "Pediatrics", performance: "same", percentageCorrect: 58, category: "Disciplines" },
  { subject: "Medicine", performance: "higher", percentageCorrect: 80, category: "Disciplines" }
];

interface PerformanceTopicItemProps {
  item: PerformanceItem;
  onClick: (subject: string) => void;
  view: 'grouped' | 'list';
}

import ClippedText from './ClippedText';

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
