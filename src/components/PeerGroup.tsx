import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import DistributionChart from './DistributionChart';
import { generateDistributionData, findPercentile } from '@/utils/distributionUtils';
import { useState, useEffect, useMemo, memo } from 'react';

interface PeerGroupProps {
  studentScore?: number;
  examStep: 'step1' | 'step2';
}

const PeerGroup = memo(({ 
  studentScore = 245,
  examStep 
}: PeerGroupProps) => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<"all" | "same-objective" | "same-state" | "same-school">("all");
  
  const data = useMemo(() => generateDistributionData(), []);
  
  const studentPercentile = useMemo(() => 
    findPercentile(studentScore), 
    [studentScore]
  );

  const stepDisplay = examStep === 'step1' ? '(Step 1)' : '(Step 2)';

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between p-5">
        <CardTitle>Peer group comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <DistributionChart 
            data={data} 
            displayMode="normal" 
            studentScore={studentScore} 
            studentPercentile={studentPercentile} 
            peerGroup={selectedPeerGroup} 
          />

          <div className="mt-3 w-[200px] space-y-2">
            <Label htmlFor="peer-group">Peer Group</Label>
            <Select 
              value={selectedPeerGroup} 
              onValueChange={(value: "all" | "same-objective" | "same-state" | "same-school") => 
                setSelectedPeerGroup(value)
              }
            >
              <SelectTrigger id="peer-group" className="w-full">
                <SelectValue placeholder="Select peer group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{`All AMBOSS ${stepDisplay}`}</SelectItem>
                <SelectItem value="same-objective">Same learning objective</SelectItem>
                <SelectItem value="same-state">Same state</SelectItem>
                <SelectItem value="same-school">Same school</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  return prevProps.studentScore === nextProps.studentScore && 
         prevProps.examStep === nextProps.examStep;
});

PeerGroup.displayName = 'PeerGroup';

export default PeerGroup;
