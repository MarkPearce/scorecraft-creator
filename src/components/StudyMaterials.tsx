
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleTitles } from "@/utils/subjectUtils";

interface StudyMaterialsProps {
  subject: string;
  isComplete: boolean;
  score: number;
}

export const StudyMaterials = ({ subject, isComplete, score }: StudyMaterialsProps) => {
  return (
    <div className="mt-4 pl-8 animate-fadeIn">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <div className="grid auto-cols-min grid-flow-col gap-4 h-full">
              <div className="flex flex-col w-[120px]">
                <div className="text-sm font-medium text-yellow-500 mb-1 text-center whitespace-nowrap">Current Score</div>
                <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-100 border-gray-300'}`}>
                  {isComplete && (
                    <div className="text-2xl font-bold text-yellow-500">{score}%</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-[120px]">
                <div className="text-sm font-medium text-yellow-500 mb-1 text-center whitespace-nowrap">Target Score</div>
                <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-100 border-gray-300'}`}>
                  {isComplete && (
                    <div className="text-2xl font-bold text-yellow-500">80%</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-[120px]">
                <div className="text-sm font-medium text-yellow-500 mb-1 text-center whitespace-nowrap">Percentile</div>
                <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-100 border-gray-300'}`}>
                  {isComplete && (
                    <div className="text-2xl font-bold text-yellow-500">75th</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col">
              <div className="text-sm font-medium text-yellow-500 mb-1">Study Materials</div>
              <div className="space-y-1">
                {getArticleTitles(subject).map((title, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="flex items-center space-x-2 text-sm text-yellow-500 hover:text-yellow-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Newspaper className="w-4 h-4" />
                    <span>{title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Practice Questions
          </Button>
        </div>
      </div>
    </div>
  );
};
