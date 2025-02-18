
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TextProjectionCard = () => {
  return <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-lato">Performance summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-left text-gray-600 font-lato text-base">
          <p className="text-base font-normal">Users with your current performance and time to exam typically <span className="font-bold">score 230-250 on a 3-digit scale</span>. If you maintain your current performance, you will reach the passing score in 2 months and your target score in 4 months!</p>

          
        </div>
      </CardContent>
    </Card>;
};
