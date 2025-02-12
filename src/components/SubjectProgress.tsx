
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, LucideIcon, Newspaper, Star, BookOpenCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface SubjectProgressProps {
  subject: string;
  questionsCompleted: number;
  totalQuestions: number;
  targetQuestions: number;
  score: number;
  icon: LucideIcon;
  iconColor?: string;
  examWeight?: string;
}

const SubjectProgress = ({
  subject,
  questionsCompleted,
  totalQuestions,
  targetQuestions,
  score,
  icon: Icon,
  iconColor = "text-gray-500",
  examWeight
}: SubjectProgressProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const progressPercentage = (questionsCompleted / totalQuestions) * 100;
  
  const isComplete = questionsCompleted === totalQuestions;

  const getTargetScore = () => {
    if (!examWeight) return 80;
    const weight = parseInt(examWeight.split('-')[0]); // Get lower bound of weight range
    if (weight < 5) return 70; // Lower target for low-weight sections
    if (weight < 10) return 75; // Medium target for medium-weight sections
    return 80; // Higher target for high-weight sections
  };

  const targetScore = getTargetScore();
  const meetsTarget = score >= targetScore;
  
  const getProgressColor = () => {
    if (isComplete) {
      return "bg-[#66BB6A]";
    }
    return "bg-[#8A898C]";
  };

  const getArticleTitles = () => {
    const subjectArticles: { [key: string]: string[] } = {
      "Human Development": [
        "Embryology: First Trimester Development",
        "Congenital Disorders and Genetic Testing",
        "Fetal Development and Birth Defects"
      ],
      "Blood & Lymphoreticular/Immune Systems": [
        "Hematopoiesis and Bone Marrow Disorders",
        "Immunodeficiency Diseases: A Clinical Guide",
        "Lymphoma Classification and Treatment"
      ],
      "Behavioral Health & Nervous Systems": [
        "Neurotransmitters and Psychiatric Disorders",
        "Clinical Neurology: Patient Assessment",
        "Brain Structure and Common Pathologies"
      ],
      "Musculoskeletal & Skin": [
        "Orthopedic Examination Techniques",
        "Dermatological Manifestations of Disease",
        "Musculoskeletal Disorders: A Review"
      ],
      "Cardiovascular System": [
        "ECG Interpretation: A Systematic Approach",
        "Heart Failure: Pathophysiology and Management",
        "Cardiovascular Physical Examination"
      ],
      "Respiratory & Renal/Urinary Systems": [
        "Pulmonary Function Testing",
        "Kidney Disease: Diagnosis and Treatment",
        "Respiratory Pathophysiology"
      ],
      "Gastrointestinal System": [
        "Liver Disease: Clinical Assessment",
        "GI Tract Disorders and Management",
        "Nutrition in GI Disorders"
      ],
      "Reproductive & Endocrine Systems": [
        "Hormone Regulation and Disorders",
        "Reproductive System Pathology",
        "Endocrine System: Clinical Cases"
      ],
      "Multisystem Processes & Disorders": [
        "Autoimmune Disease Recognition",
        "Systemic Inflammatory Response",
        "Multi-organ Failure Management"
      ],
      "Biostatistics & Epidemiology": [
        "Clinical Trial Design and Analysis",
        "Statistical Methods in Medicine",
        "Evidence-Based Medicine Principles"
      ],
      "Social Sciences & Communication": [
        "Patient Communication Strategies",
        "Medical Ethics and Decision Making",
        "Cultural Competency in Healthcare"
      ]
    };

    return subjectArticles[subject] || [
      "Overview & Core Concepts",
      "Clinical Applications",
      "Practice Guidelines"
    ];
  };

  return (
    <Card className="animate-fadeIn">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="border rounded-lg p-4 hover:border-blue-200 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <div className="flex items-center space-x-2">
              <span className="font-medium">{subject}</span>
              {examWeight && (
                <span className="text-xs text-gray-500">
                  ({examWeight}%)
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {meetsTarget && isComplete && (
                <Star 
                  className="w-5 h-5 text-[#F97316] mr-1" 
                  fill="#FACC15" 
                  stroke="#F97316"
                  strokeWidth={1.5}
                />
              )}
              {(!meetsTarget || !isComplete) && (
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-7 w-7 -ml-1 transition-colors group
                    ${isComplete && !meetsTarget 
                      ? "bg-[#66BB6A] hover:bg-white border-[#66BB6A] hover:border-[#66BB6A]" 
                      : "hover:bg-foreground hover:text-background"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add your practice questions navigation logic here
                  }}
                >
                  <BookOpenCheck 
                    className={`h-4 w-4 
                      ${isComplete && !meetsTarget 
                        ? "text-white group-hover:text-[#66BB6A]" 
                        : ""}`} 
                  />
                </Button>
              )}
              <div className="w-20 h-2 rounded-full overflow-hidden bg-gray-100">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor()}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {questionsCompleted}/{totalQuestions}
              </span>
            </div>
            <span className="text-sm font-medium text-blue-600">
              {score}/{targetScore}%
            </span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4 pl-8 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="grid auto-cols-min grid-flow-col gap-4 h-full">
                    <div className="flex flex-col w-[90px]">
                      <div className="text-sm font-medium text-gray-600 mb-1 text-center">Current Score</div>
                      <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-blue-50 border-blue-600' : 'bg-gray-100 border-gray-300'}`}>
                        {isComplete && (
                          <div className="text-2xl font-bold text-blue-600">{score}%</div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col w-[90px]">
                      <div className="text-sm font-medium text-gray-600 mb-1 text-center">Target Score</div>
                      <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-green-50 border-green-600' : 'bg-gray-100 border-gray-300'}`}>
                        {isComplete && (
                          <div className="text-2xl font-bold text-green-600">{targetScore}%</div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col w-[90px]">
                      <div className="text-sm font-medium text-gray-600 mb-1 text-center">Percentile</div>
                      <div className={`flex-1 px-2.5 py-1.5 rounded-lg border flex items-center justify-center ${isComplete ? 'bg-purple-50 border-purple-600' : 'bg-gray-100 border-gray-300'}`}>
                        {isComplete && (
                          <div className="text-2xl font-bold text-purple-600">75th</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-600 mb-1">Study Materials</div>
                    <div className="space-y-1">
                      {getArticleTitles().map((title, index) => (
                        <a 
                          key={index}
                          href="#" 
                          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
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
        )}
      </div>
    </Card>
  );
};

export default SubjectProgress;
