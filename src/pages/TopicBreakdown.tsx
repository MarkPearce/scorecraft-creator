
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Beaker, Heart, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PerformanceOverview from "@/components/PerformanceOverview";
import ScoreDistribution from "@/components/ScoreDistribution";
import SubjectProgress from "@/components/SubjectProgress";

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Topic Breakdown</h1>
          <div className="flex items-center justify-center text-gray-600 mb-8">
            <BookOpen className="h-5 w-5 mr-2" />
            <p>Detailed analysis of your performance by topic</p>
          </div>
        </div>

        <PerformanceOverview 
          score={33}
          targetScore={57}
          questionsTagged={19}
          totalQuestions={2261}
          targetQuestions={2035}
        />

        <ScoreDistribution />

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
