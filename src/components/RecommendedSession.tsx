import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuestionSessionDialog from "./QuestionSessionDialog";
const RecommendedSession = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return <>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <CardHeader className="p-5">
              <CardTitle className="font-lato">Optimized question sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 font-lato">Start an AI-powered question session with high-yield topics prioritized according to your Qbank performance.</p>
                <div>
                  <Button variant="default" className="font-lato" onClick={() => setIsDialogOpen(true)}>
                    Start session
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="flex items-center justify-center p-6">
            <img alt="Person working at computer" className="w-full h-auto max-w-[300px]" src="/lovable-uploads/7f2af8dd-6fd7-4ada-a3f5-ab4ba6e3b14b.png" />
          </div>
        </div>
      </Card>

      <QuestionSessionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>;
};
export default RecommendedSession;