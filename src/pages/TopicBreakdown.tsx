
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Beaker, Heart, Brain, Activity, Baby, Users, Droplets, Bone, FlaskConical, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PerformanceOverview from "@/components/PerformanceOverview";
import SubjectProgress from "@/components/SubjectProgress";
import { Card } from "@/components/ui/card";
import { GastroIcon } from "@/components/icons/GastroIcon";
import { LungsIcon } from "@/components/icons/LungsIcon";
import { ReproductiveIcon } from "@/components/icons/ReproductiveIcon";

const TopicBreakdown = () => {
  const navigate = useNavigate();

  // Calculate total questions answered from all systems
  const systemsData = [
    { questionsCompleted: 50 }, // Human Development
    { questionsCompleted: 50 }, // Blood & Lymphoreticular/Immune Systems
    { questionsCompleted: 38 }, // Behavioral Health & Nervous Systems
    { questionsCompleted: 50 }, // Musculoskeletal & Skin
    { questionsCompleted: 28 }, // Cardiovascular System
    { questionsCompleted: 50 }, // Respiratory & Renal/Urinary Systems - Updated to 50
    { questionsCompleted: 29 }, // Gastrointestinal System
    { questionsCompleted: 36 }, // Reproductive & Endocrine Systems
    { questionsCompleted: 34 }, // Multisystem Processes & Disorders
    { questionsCompleted: 27 }, // Biostatistics & Epidemiology
    { questionsCompleted: 30 }  // Social Sciences & Communication
  ];

  const totalQuestionsAnswered = systemsData.reduce((sum, system) => sum + system.questionsCompleted, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">USMLE Step 1 Performance</h1>
          <div className="flex items-center justify-center text-gray-600 mb-8">
            <BookOpen className="h-5 w-5 mr-2" />
            <p>Track your progress and identify areas for improvement</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Overall Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="grid grid-cols-2 divide-x-2 divide-gray-600">
                <div className="pr-4">
                  <div className="text-sm text-[#403E43] mb-2">Your Score</div>
                  <div className="text-4xl font-bold text-gray-900">238</div>
                </div>
                <div className="pl-4">
                  <div className="text-sm text-[#403E43] mb-2">Target Score</div>
                  <div className="text-4xl font-bold text-gray-600">240</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-[#403E43] mb-2">Questions Answered</div>
              <div className="text-4xl font-bold text-gray-900">{totalQuestionsAnswered}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-[#403E43] mb-2">Exam Date</div>
              <div className="text-4xl font-bold text-gray-900">Oct 15, 2025</div>
            </Card>
          </div>
        </div>

        <PerformanceOverview 
          score={33}
          targetScore={57}
          questionsTagged={19}
          totalQuestions={2261}
          targetQuestions={2035}
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Systems Breakdown</h2>
          <div className="space-y-4">
            <SubjectProgress 
              subject="Human Development"
              questionsCompleted={50}
              totalQuestions={50}
              targetQuestions={40}
              score={75}
              icon={Baby}
              iconColor="text-pink-500"
              examWeight="1-3"
            />
            <SubjectProgress 
              subject="Blood & Lymphoreticular/Immune Systems"
              questionsCompleted={50}
              totalQuestions={50}
              targetQuestions={40}
              score={82}
              icon={Droplets}
              iconColor="text-red-500"
              examWeight="9-13"
            />
            <SubjectProgress 
              subject="Behavioral Health & Nervous Systems"
              questionsCompleted={38}
              totalQuestions={50}
              targetQuestions={40}
              score={68}
              icon={Brain}
              iconColor="text-purple-500"
              examWeight="10-14"
            />
            <SubjectProgress 
              subject="Musculoskeletal & Skin"
              questionsCompleted={50}
              totalQuestions={50}
              targetQuestions={40}
              score={71}
              icon={Bone}
              iconColor="text-amber-500"
              examWeight="8-12"
            />
            <SubjectProgress 
              subject="Cardiovascular System"
              questionsCompleted={28}
              totalQuestions={50}
              targetQuestions={40}
              score={79}
              icon={Heart}
              iconColor="text-red-500"
              examWeight="7-11"
            />
            <SubjectProgress 
              subject="Respiratory & Renal/Urinary Systems"
              questionsCompleted={50}
              totalQuestions={50}
              targetQuestions={40}
              score={73}
              icon={LungsIcon}
              iconColor="text-cyan-600"
              examWeight="11-15"
            />
            <SubjectProgress 
              subject="Gastrointestinal System"
              questionsCompleted={29}
              totalQuestions={50}
              targetQuestions={40}
              score={77}
              icon={GastroIcon}
              iconColor="text-amber-600"
              examWeight="6-10"
            />
            <SubjectProgress 
              subject="Reproductive & Endocrine Systems"
              questionsCompleted={36}
              totalQuestions={50}
              targetQuestions={40}
              score={81}
              icon={ReproductiveIcon}
              iconColor="text-rose-500"
              examWeight="12-16"
            />
            <SubjectProgress 
              subject="Multisystem Processes & Disorders"
              questionsCompleted={34}
              totalQuestions={50}
              targetQuestions={40}
              score={69}
              icon={FlaskConical}
              iconColor="text-violet-500"
              examWeight="8-12"
            />
            <SubjectProgress 
              subject="Biostatistics & Epidemiology"
              questionsCompleted={27}
              totalQuestions={50}
              targetQuestions={40}
              score={72}
              icon={Beaker}
              iconColor="text-blue-500"
              examWeight="4-6"
            />
            <SubjectProgress 
              subject="Social Sciences & Communication"
              questionsCompleted={30}
              totalQuestions={50}
              targetQuestions={40}
              score={76}
              icon={MessageCircle}
              iconColor="text-teal-500"
              examWeight="6-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicBreakdown;
