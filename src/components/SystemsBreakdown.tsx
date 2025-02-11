
import { BeakerIcon, Brain, Heart, Stethoscope, ActivitySquare, Baby } from 'lucide-react';
import SystemCard from './SystemCard';

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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Systems Breakdown</h2>
      <div className="space-y-4">
        {systems.map((system) => (
          <SystemCard
            key={system.name}
            {...system}
          />
        ))}
      </div>
    </div>
  );
};

export default SystemsBreakdown;
