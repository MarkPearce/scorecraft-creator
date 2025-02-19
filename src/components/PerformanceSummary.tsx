
import { LayoutList, Columns } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceTopicItem, { performanceData, step2Data, PerformanceItem } from './PerformanceTopicItem';

type ViewMode = 'grouped' | 'list';

interface PerformanceSummaryProps {
  examStep?: 'step1' | 'step2';
}

const PerformanceSummary = ({ examStep = 'step2' }: PerformanceSummaryProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  
  const getCurrentData = () => {
    if (examStep === 'step2') {
      const allStep2Data = [
        ...step2Data.tasks,
        ...step2Data.systems,
        ...step2Data.disciplines
      ];
      return {
        lower: allStep2Data.filter(item => item.performance === 'lower'),
        same: allStep2Data.filter(item => item.performance === 'same'),
        higher: allStep2Data.filter(item => item.performance === 'higher')
      };
    }
    
    return {
      lower: performanceData.filter(item => item.performance === 'lower'),
      same: performanceData.filter(item => item.performance === 'same'),
      higher: performanceData.filter(item => item.performance === 'higher')
    };
  };

  const { lower, same, higher } = getCurrentData();

  const Column = ({
    title,
    items
  }: {
    title: string;
    items: PerformanceItem[];
  }) => (
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <PerformanceTopicItem 
            key={index} 
            item={item} 
            onClick={() => {}} 
            view="grouped" 
          />
        ))}
      </div>
    </div>
  );

  const Step2Categories = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Physician Tasks</h3>
        <div className="space-y-2">
          {step2Data.tasks.map((item, index) => (
            <PerformanceTopicItem 
              key={index} 
              item={item} 
              onClick={() => {}} 
              view="list" 
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Organ Systems</h3>
        <div className="space-y-2">
          {step2Data.systems.map((item, index) => (
            <PerformanceTopicItem 
              key={index} 
              item={item} 
              onClick={() => {}} 
              view="list" 
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Disciplines</h3>
        <div className="space-y-2">
          {step2Data.disciplines.map((item, index) => (
            <PerformanceTopicItem 
              key={index} 
              item={item} 
              onClick={() => {}} 
              view="list" 
            />
          ))}
        </div>
      </div>
    </div>
  );

  const listItems = examStep === 'step2' 
    ? [...step2Data.tasks, ...step2Data.systems, ...step2Data.disciplines]
    : [...lower, ...same, ...higher];

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-col space-y-2">
        <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
          {examStep === 'step2' ? 'Clinical Performance' : 'Performance by subject'}
          <Button 
            variant="outline" 
            className="h-8 w-8 p-0 [&_svg]:size-5" 
            onClick={() => setViewMode(viewMode === 'grouped' ? 'list' : 'grouped')}
          >
            {viewMode === 'grouped' ? <LayoutList /> : <Columns />}
          </Button>
        </CardTitle>
        <p className="text-base text-gray-600">
          {examStep === 'step2' 
            ? "Review your performance across different aspects of clinical medicine. Focus on areas where you need improvement to enhance your overall clinical competency."
            : "These are your personal strengths and weaknesses. Focus on your weaknesses to improve your performance. Below is a breakdown of your performance compared to other students studying for this exam."
          }
        </p>
      </CardHeader>
      <CardContent className="mt-4">
        {examStep === 'step2' && viewMode === 'grouped' ? (
          <Step2Categories />
        ) : (
          viewMode === 'grouped' ? (
            <div className="flex gap-6">
              <Column title="Lower" items={lower} />
              <Column title="Same" items={same} />
              <Column title="Higher" items={higher} />
            </div>
          ) : (
            <div>
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr className="grid grid-cols-12 gap-4">
                    <th className="col-span-7 text-left text-sm font-medium text-gray-700 pb-3">Subject</th>
                    <th className="col-span-2 text-right text-sm font-medium text-gray-700 pb-3 pr-4">% Correct</th>
                    <th className="col-span-3 text-center text-sm font-medium text-gray-700 pb-3">Performance</th>
                  </tr>
                </thead>
                <tbody className="pt-2">
                  {listItems.map((item, index) => (
                    <PerformanceTopicItem 
                      key={index} 
                      item={item} 
                      onClick={() => {}} 
                      view="list" 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceSummary;
