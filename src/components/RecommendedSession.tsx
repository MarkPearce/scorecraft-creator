
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RecommendedSession = () => {
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
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
        </div>
        <div className="flex items-center justify-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336.6 147" className="w-full h-full">
            <rect width="336.6" height="147" fill="none"/>
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default RecommendedSession;
