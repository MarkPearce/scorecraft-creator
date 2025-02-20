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
              <CardTitle className="font-lato">Smart question sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 font-lato">Start an AI-powered high yield Qbank session, stack-ranked by relevance to your performance</p>
                <div>
                  <Button variant="default" className="font-lato" onClick={() => setIsDialogOpen(true)}>
                    Start session
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="flex items-center justify-center p-6">
            <img src="/lovable-uploads/0a25dd66-245e-4d19-8fea-c471a2cbaa16.png" alt="Person working at computer" className="w-full h-auto max-w-[300px]" />
          </div>
        </div>
      </Card>

      <QuestionSessionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>;
};
export default RecommendedSession;