
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PeerGroup from "@/components/PeerGroup";
import PerformanceSummary from "@/components/PerformanceSummary";
import PerformanceTrackingContainer from "@/components/PerformanceTrackingContainer";
import { TextProjectionCard } from "@/components/TextProjectionCard";
import { PageHeader } from "@/components/PageHeader";
import PerformanceScoreCard from "@/components/PerformanceScoreCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import OverallPerformance from "@/components/OverallPerformance";
import { useState } from "react";

const Report = () => {
  const navigate = useNavigate();
  const currentPercentile = 30;
  const [currentStep, setCurrentStep] = useState<'step1' | 'step2'>('step2');

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center hover:bg-gray-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Button>

            <RadioGroup 
              value={currentStep}
              onValueChange={(value: 'step1' | 'step2') => setCurrentStep(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors cursor-pointer">
                <RadioGroupItem value="step1" id="step1" />
                <Label htmlFor="step1" className="text-sm font-medium cursor-pointer">USMLE Step 1</Label>
              </div>
              <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors cursor-pointer">
                <RadioGroupItem value="step2" id="step2" />
                <Label htmlFor="step2" className="text-sm font-medium cursor-pointer">USMLE Step 2</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">Continuous score assessment</h1>
            <p className="mt-2 text-gray-600">
              Here is your assessment based on Qbank performance.
            </p>
          </div>
          
          <div className="space-y-6">
            <OverallPerformance 
              yourScore={245}
              targetScore={260}
              questionsAnswered={422}
              examDate="Oct 15, 2025"
            />
            <TextProjectionCard percentile={currentPercentile} />
            <PeerGroup />
            <PerformanceScoreCard 
              examStep={currentStep}
              initialScore={245}
              initialTargetScore={currentStep === 'step1' ? undefined : 260}
              passingStandard={currentStep === 'step1' ? 252 : undefined}
              showControls={false}
              title="Current performance"
            />
            <PerformanceTrackingContainer />
            <PerformanceSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
