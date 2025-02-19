import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import DistributionChart from './DistributionChart';
import { generateDistributionData, findPercentile } from '@/utils/distributionUtils';
import { useState } from 'react';

// Student score
const studentScore = 245;
const data = generateDistributionData();
const studentPercentile = findPercentile(studentScore);
const PeerGroup = () => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<"all" | "same-objective" | "same-state" | "same-school">("all");
  return <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Peer group comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          
          
          <DistributionChart data={data} displayMode="normal" studentScore={studentScore} studentPercentile={studentPercentile} peerGroup={selectedPeerGroup} />

          <div className="mt-3 w-[200px] space-y-2">
            <Label htmlFor="peer-group">Peer Group</Label>
            <Select value={selectedPeerGroup} onValueChange={(value: "all" | "same-objective" | "same-state" | "same-school") => setSelectedPeerGroup(value)}>
              <SelectTrigger id="peer-group" className="w-full">
                <SelectValue placeholder="Select peer group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All AMBOSS</SelectItem>
                <SelectItem value="same-objective">Same learning objective</SelectItem>
                <SelectItem value="same-state">Same state</SelectItem>
                <SelectItem value="same-school">Same school</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default PeerGroup;