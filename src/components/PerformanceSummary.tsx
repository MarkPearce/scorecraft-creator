
import { LayoutList, Columns } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PerformanceTopicItem, { performanceData, step2PerformanceData } from './PerformanceTopicItem';

type ViewMode = 'grouped' | 'list';
type Category = 'Systems' | 'Physician Tasks' | 'Disciplines';

interface PerformanceSummaryProps {
  examStep: 'step1' | 'step2';
}

const PerformanceSummary = ({
  examStep
}: PerformanceSummaryProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Systems');
  
  const currentData = examStep === 'step1' ? performanceData : step2PerformanceData;
  const filteredData = examStep === 'step1' 
    ? currentData 
    : currentData.filter(item => item.category === selectedCategory);
  
  const lowerPerformance = filteredData.filter(item => item.performance === 'lower');
  const samePerformance = filteredData.filter(item => item.performance === 'same');
  const higherPerformance = filteredData.filter(item => item.performance === 'higher');

  const Column = ({
    title,
    items
  }: {
    title: string;
    items: typeof currentData;
  }) => (
    <div className="w-full min-w-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <span className="text-sm text-gray-500 mr-3">% Correct</span>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => <PerformanceTopicItem key={index} item={item} onClick={() => {}} view="grouped" />)}
      </div>
    </div>
  );

  const sortedItems = [...lowerPerformance, ...samePerformance, ...higherPerformance];

  return <Card className="animate-fadeIn">
      <CardHeader className="flex flex-col space-y-2 p-5">
        <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
          Strengths and weaknesses
          <Button variant="outline" className="h-8 w-8 p-0 [&_svg]:size-5" onClick={() => setViewMode(viewMode === 'grouped' ? 'list' : 'grouped')}>
            {viewMode === 'grouped' ? <LayoutList /> : <Columns />}
          </Button>
        </CardTitle>
        <p className="text-base text-gray-600">See your strengths and weaknesses to focus your study effectively.</p>
        {examStep === 'step2' && (
          <div className="pt-4">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
              <SelectTrigger className="w-fit min-w-[160px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Systems">Systems</SelectItem>
                <SelectItem value="Physician Tasks">Physician Tasks</SelectItem>
                <SelectItem value="Disciplines">Disciplines</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent className="mt-4">
        {viewMode === 'grouped' ? <div className="grid grid-cols-3 gap-6">
            <Column title="Lower" items={lowerPerformance} />
            <Column title="Same" items={samePerformance} />
            <Column title="Higher" items={higherPerformance} />
          </div> : <div>
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr className="grid grid-cols-12 gap-4">
                  <th className="col-span-7 text-left text-sm font-medium text-gray-700 pb-3">Subject</th>
                  <th className="col-span-2 text-right text-sm font-medium text-gray-700 pb-3 pr-4">% Correct</th>
                  <th className="col-span-3 text-center text-sm font-medium text-gray-700 pb-3">Performance</th>
                </tr>
              </thead>
              <tbody className="pt-2">
                {sortedItems.map((item, index) => <PerformanceTopicItem key={index} item={item} onClick={() => {}} view="list" />)}
              </tbody>
            </table>
          </div>}
      </CardContent>
    </Card>;
};

export default PerformanceSummary;
