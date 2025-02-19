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
            <CardHeader>
              <CardTitle className="font-lato">Your stacked rank Qbank session</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600 font-lato">AMBOSS uses AI to create a stack-ranked Question session that covers the most high-yield questions based on your past performance.</p>
              <div>
                <Button variant="default" className="font-lato" onClick={() => setIsDialogOpen(true)}>
                  Start session
                </Button>
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