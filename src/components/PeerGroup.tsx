
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DistributionChart from './DistributionChart';
import { generateDistributionData, findPercentile } from '@/utils/distributionUtils';

// Student score
const studentScore = 245;
const data = generateDistributionData();
const studentPercentile = findPercentile(studentScore);

const PeerGroup = () => {
  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Peer group comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <p className="text-gray-600 mb-4 text-base font-lato">
            You are currently at the <span className="text-gray-600">{studentPercentile}<sup className="text-xs">th</sup></span> percentile compared to other learners.
          </p>
          
          <DistributionChart 
            data={data}
            displayMode="normal"
            studentScore={studentScore}
            studentPercentile={studentPercentile}
          />

          <div className="mt-3 w-[200px] space-y-2">
            <Label htmlFor="peer-group">Peer Group</Label>
            <Select value="all" onValueChange={() => {}}>
              <SelectTrigger id="peer-group" className="w-full">
                <SelectValue placeholder="Select peer group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="same-state">Same State</SelectItem>
                <SelectItem value="same-year">Same Year</SelectItem>
                <SelectItem value="same-school">Same School</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerGroup;
