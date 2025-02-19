
import { LayoutList, Columns } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceTopicItem, { performanceData } from './PerformanceTopicItem';

type ViewMode = 'grouped' | 'list';

const PerformanceSummary = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  
  const lowerPerformance = performanceData.filter(item => item.performance === 'lower');
  const samePerformance = performanceData.filter(item => item.performance === 'same');
  const higherPerformance = performanceData.filter(item => item.performance === 'higher');

  const Column = ({
    title,
    items
  }: {
    title: string;
    items: typeof performanceData;
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

  const sortedItems = [...lowerPerformance, ...samePerformance, ...higherPerformance];

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-col space-y-2">
        <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
          Performance by subject
          <Button 
            variant="outline" 
            className="h-8 w-8 p-0 [&_svg]:size-5" 
            onClick={() => setViewMode(viewMode === 'grouped' ? 'list' : 'grouped')}
          >
            {viewMode === 'grouped' ? <LayoutList /> : <Columns />}
          </Button>
        </CardTitle>
        <p className="text-base text-gray-600">
          These are your personal strengths and weaknesses. Focus on your weaknesses to improve your performance. Below is a breakdown of your performance compared to other students studying for this exam.
        </p>
      </CardHeader>
      <CardContent className="mt-4">
        {viewMode === 'grouped' ? (
          <div className="flex gap-6">
            <Column title="Lower" items={lowerPerformance} />
            <Column title="Same" items={samePerformance} />
            <Column title="Higher" items={higherPerformance} />
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
                {sortedItems.map((item, index) => (
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
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceSummary;
