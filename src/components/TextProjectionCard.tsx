
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PercentileDisplay } from "@/components/PercentileDisplay";

interface TextProjectionCardProps {
  percentile: number;
  examStep?: 'step1' | 'step2';
}

export const TextProjectionCard = ({ percentile, examStep = 'step2' }: TextProjectionCardProps) => {
  const getReadinessMessage = () => {
    return examStep === 'step1' 
      ? "If you maintain your current performance you should be ready for your Step 1 exam in 2 months."
      : "If you maintain your current performance you should be ready for your Step 2 exam in 3 months.";
  };

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-lato">Percentile ranking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-left text-gray-600 font-lato">
            <p>
              You are currently at the {percentile}<sup>th</sup> percentile compared to other learners.
            </p>

            <p>
              On this percentile rank, learners usually end up scoring <span className="font-bold">230-250 on a 3-digit-scale</span>. Keep it up!
            </p>

            <p>
              {getReadinessMessage()}
            </p>
          </div>
          
          <div>
            <PercentileDisplay percentile={percentile} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
