import { BarChart, LayoutList, Columns } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

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

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" style={{ minWidth: '20px', minHeight: '20px' }}>
    <path fill="currentColor" d="M12 8a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0z"></path>
    <path fill="currentColor" fillRule="evenodd" d="M8 2a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2v.723a9.02 9.02 0 0 1 6.197 5.056 3.121 3.121 0 0 1 3.63 5.045h-.002l-10.197 8.947a1 1 0 0 1-.665.248L8.494 23a1 1 0 0 1-.969-1.223l.192-.839-.013-.005C4.374 19.653 2 16.353 2 12.5a9 9 0 0 1 7-8.777V3a1 1 0 0 1-1-1m3 3.5a7 7 0 0 1 6.583 4.613l-8.987 7.835a1 1 0 0 0-.318.531l-.11.484C5.739 17.91 4 15.42 4 12.5a7 7 0 0 1 7-7m9.85 4.853a1.12 1.12 0 0 0-.813.274l-7.521 6.557 1.611 1.612 7.382-6.477.002-.002a1.121 1.121 0 0 0-.66-1.964Zm-8.23 9.764-1.615-1.615-.85.74-.402 1.765 1.842.01z" clipRule="evenodd"></path>
  </svg>
);

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

  const Column = ({ title, items }: { title: string; items: PerformanceItem[] }) => (
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleStartSession(item.subject)}
            className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              item.performance === 'higher'
                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                : item.performance === 'lower'
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            } flex justify-between items-center group`}
          >
            <span>{item.subject}</span>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 p-0 flex items-center justify-center border transition-colors ${
                item.performance === 'higher'
                  ? 'border-green-600 text-green-600 group-hover:bg-green-600 group-hover:text-white'
                  : item.performance === 'lower'
                  ? 'border-red-600 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                  : 'border-gray-600 text-gray-600 group-hover:bg-gray-600 group-hover:text-white'
              }`}
            >
              <PencilIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const sortedItems = [...lowerPerformance, ...samePerformance, ...higherPerformance];

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Your relative strengths and weaknesses</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setViewMode(viewMode === 'grouped' ? 'list' : 'grouped')}
        >
          {viewMode === 'grouped' ? 
            <LayoutList className="h-5 w-5" /> : 
            <Columns className="h-5 w-5" />
          }
        </Button>
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
            <div className="flex justify-end mb-2">
              <span className="text-sm font-medium text-gray-700 min-w-[80px] text-center">Performance</span>
            </div>
            <div className="space-y-3">
              {sortedItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleStartSession(item.subject)}
                  className={`flex items-center justify-between py-2 px-3 hover:bg-gray-50 transition-colors rounded-lg cursor-pointer group`}
                >
                  <span className="font-medium text-gray-900">{item.subject}</span>
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3 py-1 rounded-full text-sm min-w-[80px] text-center ${
                        item.performance === 'higher'
                          ? 'bg-green-50 text-green-600'
                          : item.performance === 'lower'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {item.performance.charAt(0).toUpperCase() + item.performance.slice(1)}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-8 w-8 p-0 flex items-center justify-center border transition-colors ${
                        item.performance === 'higher'
                          ? 'border-green-600 text-green-600 group-hover:bg-green-600 group-hover:text-white'
                          : item.performance === 'lower'
                          ? 'border-red-600 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                          : 'border-gray-600 text-gray-600 group-hover:bg-gray-600 group-hover:text-white'
                      }`}
                    >
                      <PencilIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Question Session</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you ready to start a question session for {selectedSubject}?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log(`Starting session for ${selectedSubject}`);
              setDialogOpen(false);
            }}>
              Start
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PerformanceSummary;
