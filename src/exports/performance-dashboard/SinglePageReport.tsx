
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PerformanceSummary from "./components/PerformanceSummary";
import PerformanceTrackingContainer from "./components/PerformanceTrackingContainer";
import { PageHeader } from "./components/PageHeader";
import PerformanceScoreCard from "./components/PerformanceScoreCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import OverallPerformance from "./components/OverallPerformance";
import { useState } from "react";

// Optional: if you want to use navigation in the target project
// import { useNavigate } from "react-router-dom";

export interface SinglePageReportProps {
  onBackClick?: () => void;
  initialStep?: 'step1' | 'step2';
  initialTargetScore?: number;
  initialCurrentScore?: number;
  showHeader?: boolean;
}

const SinglePageReport = ({
  onBackClick,
  initialStep = 'step2',
  initialTargetScore = 260,
  initialCurrentScore = 245,
  showHeader = true
}: SinglePageReportProps) => {
  // Optional: use this if react-router-dom is available
  // const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<'step1' | 'step2'>(initialStep);
  const [sharedTargetScore, setSharedTargetScore] = useState(initialTargetScore);
  const [currentScore, setCurrentScore] = useState(initialCurrentScore);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // Optional: use this if react-router-dom is available
      // navigate('/');
      console.log('Back button clicked, but no handler provided');
    }
  };

  return (
    <>
      {showHeader && <PageHeader />}
      <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBackClick} className="flex items-center hover:bg-gray-200 font-lato">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Button>

            <RadioGroup value={currentStep} onValueChange={(value: 'step1' | 'step2') => setCurrentStep(value)} className="flex gap-4">
              <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors cursor-pointer">
                <RadioGroupItem value="step1" id="step1" />
                <Label htmlFor="step1" className="text-sm font-medium cursor-pointer font-lato">USMLE Step 1</Label>
              </div>
              <div className="flex items-center space-x-2 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors cursor-pointer">
                <RadioGroupItem value="step2" id="step2" />
                <Label htmlFor="step2" className="text-sm font-medium cursor-pointer font-lato">USMLE Step 2</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h1 className="text-3xl font-[900] text-gray-900 font-lato">Continuous performance assessment</h1>
            <p className="mt-2 text-gray-600 font-lato">Track your USMLE readiness with insights from your AMBOSS question performance.</p>
          </div>

          <div className="space-y-8">
            <OverallPerformance questionsAnswered={422} examDate="Oct 15, 2025" />
            
            <PerformanceScoreCard 
              examStep={currentStep}
              onTargetScoreChange={setSharedTargetScore}
              showControls={false}
              title="Current performance"
            />
            
            <PerformanceTrackingContainer examStep={currentStep} />
            
            <PerformanceSummary examStep={currentStep} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePageReport;
