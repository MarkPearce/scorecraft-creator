
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Target, Scale } from "lucide-react";

interface TextProjectionCardProps {
  examStep?: 'step1' | 'step2';
}

export const TextProjectionCard = ({
  examStep = 'step2'
}: TextProjectionCardProps) => {
  const projectionText = examStep === 'step1' ? "Users with your current performance typically reach a 95% pass rate in 2 months" : "Users with your current performance and time to exam typically score 230-250 on a 3-digit scale";
  return <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-lato">Performance summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 text-left text-gray-600 font-lato">
          <div className="flex items-center">
            <p className="text-base font-normal">
              {examStep === 'step1' ? <>
                  Users with your current performance typically{" "}
                  <span className="font-bold text-gray-900">
                    reach a 95% pass rate in 2 months
                  </span>
                </> : <>
                  Users with your current performance and time to exam typically{" "}
                  <span className="font-bold text-gray-900">
                    score 230-250 on a 3-digit scale
                  </span>
                </>}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-gray-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Passing Score</p>
                <p className="text-sm">Expected in 2 months</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              {examStep === 'step1' ? <>
                  <div className="flex-shrink-0">
                    <Scale className="h-8 w-8 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">current likelihood of passing: <span className="text-sm">64%</span></p>
                  </div>
                </> : <>
                  <Target className="h-6 w-6 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Target Score</p>
                    <p className="text-sm">Expected in 4 months</p>
                  </div>
                </>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};

TextProjectionCard.displayName = 'TextProjectionCard';
