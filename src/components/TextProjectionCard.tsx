
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TextProjectionCardProps {
  percentile: number;
  examStep?: 'step1' | 'step2';
}

export const TextProjectionCard = ({
  percentile,
  examStep = 'step2'
}: TextProjectionCardProps) => {
  const getReadinessMessage = () => {
    return examStep === 'step1' 
      ? "If you maintain your current performance you should be ready for your Step 1 exam in 2 months." 
      : "If you maintain your current performance you should be ready for your Step 2 exam in 3 months.";
  };

  return <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-lato">Performance summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-left text-gray-600 font-lato text-base">
          <p>
            Users with your current performance and exam date typically end up scoring 230-250 on a 3-digit scale. If you maintain your current performance, you will reach the passing score in 2 months and reach your target score in 4 months!
          </p>

          <p>
            {getReadinessMessage()}
          </p>
        </div>
      </CardContent>
    </Card>;
};
