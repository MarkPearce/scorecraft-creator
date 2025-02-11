
import { Progress } from "@/components/ui/progress";
import { BeakerIcon, Brain, Heart, Stethoscope, ActivitySquare, PlusCircle, Baby } from 'lucide-react';

interface SystemData {
  name: string;
  icon: JSX.Element;
  score: number;
  questionsTagged: number;
  totalQuestions: number;
  targetScore: number;
}

const systems: SystemData[] = [
  {
    name: "Biochemistry",
    icon: <BeakerIcon className="h-5 w-5 text-blue-500" />,
    score: 75,
    questionsTagged: 142,
    totalQuestions: 250,
    targetScore: 80
  },
  {
    name: "Cardiovascular",
    icon: <Heart className="h-5 w-5 text-red-500" />,
    score: 82,
    questionsTagged: 178,
    totalQuestions: 300,
    targetScore: 85
  },
  {
    name: "Neurology",
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    score: 68,
    questionsTagged: 156,
    totalQuestions: 280,
    targetScore: 75
  },
  {
    name: "Respiratory",
    icon: <Stethoscope className="h-5 w-5 text-green-500" />,
    score: 71,
    questionsTagged: 134,
    totalQuestions: 220,
    targetScore: 80
  },
  {
    name: "Endocrine",
    icon: <ActivitySquare className="h-5 w-5 text-orange-500" />,
    score: 79,
    questionsTagged: 112,
    totalQuestions: 190,
    targetScore: 85
  },
  {
    name: "Reproductive",
    icon: <Baby className="h-5 w-5 text-pink-500" />,
    score: 73,
    questionsTagged: 98,
    totalQuestions: 180,
    targetScore: 80
  }
];

const SystemsBreakdown = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-6">Systems Breakdown</h2>
      <div className="space-y-6">
        {systems.map((system) => (
          <div key={system.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {system.icon}
                <span className="font-medium">{system.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {system.questionsTagged} / {system.totalQuestions} questions
                </span>
                <span className="font-semibold text-blue-600">{system.score}%</span>
              </div>
            </div>
            <div className="relative">
              <Progress value={system.score} className="h-2" />
              <div 
                className="absolute top-0 h-2 w-0.5 bg-green-500"
                style={{ left: `${system.targetScore}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <PlusCircle className="h-4 w-4 mr-2" />
          Show more systems
        </button>
      </div>
    </div>
  );
};

export default SystemsBreakdown;
