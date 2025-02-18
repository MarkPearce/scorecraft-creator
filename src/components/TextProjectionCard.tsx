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
    return examStep === 'step1' ? "If you maintain your current performance you should be ready for your Step 1 exam in 2 months." : "If you maintain your current performance you should be ready for your Step 2 exam in 3 months.";
  };
  return;
};