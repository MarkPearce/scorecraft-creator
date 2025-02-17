
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RecommendedSession = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended session</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-gray-600">
          Do this question session to improve your performance with personalized high-yield questions and update your performance prediction.
        </p>
        <div>
          <Button variant="default">
            Start session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedSession;
