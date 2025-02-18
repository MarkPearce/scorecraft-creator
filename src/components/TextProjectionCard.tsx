
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TextProjectionCard = () => {
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
            If you maintain your current performance you should be ready for your Step 2 exam in 3 months.
          </p>
        </div>
      </CardContent>
    </Card>;
};
