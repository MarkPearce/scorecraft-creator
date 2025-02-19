import { LayoutList, Columns } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuestionSessionDialog from './QuestionSessionDialog';
import PerformanceTopicItem, { performanceData } from './PerformanceTopicItem';
export const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" style={{
  minWidth: '20px',
  minHeight: '20px'
}}>
    <path fill="currentColor" d="M12 8a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0z"></path>
    <path fill="currentColor" fillRule="evenodd" d="M8 2a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2v.723a9.02 9.02 0 0 1 6.197 5.056 3.121 3.121 0 0 1 3.63 5.045h-.002l-10.197 8.947a1 1 0 0 1-.665.248L8.494 23a1 1 0 0 1-.969-1.223l.192-.839-.013-.005C4.374 19.653 2 16.353 2 12.5a9 9 0 0 1 7-8.777V3a1 1 0 0 1-1-1m3 3.5a7 7 0 0 1 6.583 4.613l-8.987 7.835a1 1 0 0 0-.318.531l-.11.484C5.739 17.91 4 15.42 4 12.5a7 7 0 0 1 7-7m9.85 4.853a1.12 1.12 0 0 0-.813.274l-7.521 6.557 1.611 1.612 7.382-6.477.002-.002a1.121 1.121 0 0 0-.66-1.964Zm-8.23 9.764-1.615-1.615-.85.74-.402 1.765 1.842.01z" clipRule="evenodd"></path>
  </svg>;
type ViewMode = 'grouped' | 'list';
const PerformanceSummary = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const lowerPerformance = performanceData.filter(item => item.performance === 'lower');
  const samePerformance = performanceData.filter(item => item.performance === 'same');
  const higherPerformance = performanceData.filter(item => item.performance === 'higher');
  const handleStartSession = (subject: string) => {
    setSelectedSubject(subject);
    setDialogOpen(true);
  };
  const Column = ({
    title,
    items
  }: {
    title: string;
    items: typeof performanceData;
  }) => <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => <PerformanceTopicItem key={index} item={item} onClick={handleStartSession} view="grouped" />)}
      </div>
    </div>;
  const sortedItems = [...lowerPerformance, ...samePerformance, ...higherPerformance];
  return <Card className="animate-fadeIn">
      <CardHeader className="flex flex-col space-y-2">
        <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
          Your relative strengths and weaknesses
          <Button variant="outline" className="h-8 w-8 p-0 [&_svg]:size-5" onClick={() => setViewMode(viewMode === 'grouped' ? 'list' : 'grouped')}>
            {viewMode === 'grouped' ? <LayoutList /> : <Columns />}
          </Button>
        </CardTitle>
        <p className="text-base text-gray-600">These are your personal strengths and weaknesses. Focus on your weaknesses to improve your performance. Below is a breakdown of your performance compared to other students studying for this exam.</p>
      </CardHeader>
      <CardContent className="mt-4">
        {viewMode === 'grouped' ? <div className="flex gap-6">
            <Column title="Lower" items={lowerPerformance} />
            <Column title="Same" items={samePerformance} />
            <Column title="Higher" items={higherPerformance} />
          </div> : <div>
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr className="grid grid-cols-12 gap-4">
                  <th className="col-span-9 text-left text-sm font-medium text-gray-700 pb-3">Subject</th>
                  <th className="col-span-2 text-center text-sm font-medium text-gray-700 pb-3">Performance</th>
                  <th className="col-span-1 pb-3"></th>
                </tr>
              </thead>
              <tbody className="pt-2">
                {sortedItems.map((item, index) => <PerformanceTopicItem key={index} item={item} onClick={handleStartSession} view="list" />)}
              </tbody>
            </table>
          </div>}
      </CardContent>

      <QuestionSessionDialog open={dialogOpen} onOpenChange={setDialogOpen} title="Start Question Session" description={`Are you ready to start a question session for ${selectedSubject}?`} buttonText="Start Session" />
    </Card>;
};
export default PerformanceSummary;