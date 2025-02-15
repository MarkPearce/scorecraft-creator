import { BarChart, LayoutList, Columns, BookOpenCheck } from 'lucide-react';
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
              size="icon"
              className={`h-6 w-6 bg-white border transition-colors ${
                item.performance === 'higher'
                  ? 'border-green-600 text-green-600 group-hover:bg-green-600 group-hover:text-white'
                  : item.performance === 'lower'
                  ? 'border-red-600 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                  : 'border-gray-600 text-gray-600 group-hover:bg-gray-600 group-hover:text-white'
              }`}
            >
              <BookOpenCheck className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  // Sort items for list view: lower -> same -> higher
  const sortedItems = [...lowerPerformance, ...samePerformance, ...higherPerformance];

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Your Relative Strengths and Weaknesses</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode(viewMode === 'grouped' ? 'list' : 'grouped')}
        >
          {viewMode === 'grouped' ? <LayoutList className="h-4 w-4" /> : <Columns className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
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
                      size="icon"
                      className={`h-6 w-6 bg-white border transition-colors ${
                        item.performance === 'higher'
                          ? 'border-green-600 text-green-600 group-hover:bg-green-600 group-hover:text-white'
                          : item.performance === 'lower'
                          ? 'border-red-600 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                          : 'border-gray-600 text-gray-600 group-hover:bg-gray-600 group-hover:text-white'
                      }`}
                    >
                      <BookOpenCheck className="h-4 w-4" />
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
