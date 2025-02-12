import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Beaker, Heart, Brain, Activity, Baby } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PerformanceOverview from "@/components/PerformanceOverview";
import SubjectProgress from "@/components/SubjectProgress";
import { Card } from "@/components/ui/card";

const TopicBreakdown = () => {
  const navigate = useNavigate();

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

        {/* Overall Performance Stats */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Overall Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-blue-50">
              <div className="text-sm text-gray-600 mb-2">Your Score</div>
              <div className="text-4xl font-bold text-blue-600">238</div>
            </Card>
            <Card className="p-6 bg-green-50">
              <div className="text-sm text-gray-600 mb-2">Questions Tagged</div>
              <div className="text-4xl font-bold text-green-600">1,459</div>
            </Card>
            <Card className="p-6 bg-purple-50">
              <div className="text-sm text-gray-600 mb-2">Target Score</div>
              <div className="text-4xl font-bold text-purple-600">240</div>
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

        {/* Systems Breakdown */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Systems Breakdown</h2>
          <div className="space-y-4">
            <SubjectProgress 
              subject="Biochemistry"
              questionsCompleted={35}
              totalQuestions={50}
              targetQuestions={40}
              score={75}
              icon={Beaker}
              iconColor="text-blue-500"
            />
            <SubjectProgress 
              subject="Cardiovascular"
              questionsCompleted={42}
              totalQuestions={50}
              targetQuestions={40}
              score={82}
              icon={Heart}
              iconColor="text-red-500"
            />
            <SubjectProgress 
              subject="Neurology"
              questionsCompleted={38}
              totalQuestions={50}
              targetQuestions={40}
              score={68}
              icon={Brain}
              iconColor="text-purple-500"
            />
            <SubjectProgress 
              subject="Respiratory"
              questionsCompleted={31}
              totalQuestions={50}
              targetQuestions={40}
              score={71}
              icon={Activity}
              iconColor="text-green-500"
            />
            <SubjectProgress 
              subject="Endocrine"
              questionsCompleted={28}
              totalQuestions={50}
              targetQuestions={40}
              score={79}
              icon={Activity}
              iconColor="text-orange-500"
            />
            <SubjectProgress 
              subject="Reproductive"
              questionsCompleted={25}
              totalQuestions={50}
              targetQuestions={40}
              score={73}
              icon={Baby}
              iconColor="text-pink-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Subject Performance</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <SubjectProgress 
              subject="Biochemistry"
              questionsCompleted={0}
              totalQuestions={142}
              targetQuestions={128}
              score={0}
              icon={Beaker}
            />
            <SubjectProgress 
              subject="Cardiology"
              questionsCompleted={0}
              totalQuestions={73}
              targetQuestions={66}
              score={0}
              icon={Heart}
            />
            <SubjectProgress 
              subject="Neurology"
              questionsCompleted={0}
              totalQuestions={95}
              targetQuestions={85}
              score={0}
              icon={Brain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicBreakdown;
