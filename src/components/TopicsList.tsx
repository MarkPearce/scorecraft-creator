
import { useState } from 'react';
import { ChevronDown, ChevronRight, Book } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Topic {
  id: number;
  title: string;
  score: number;
}

const topics: Topic[] = [
  { id: 1, title: "Hepatitis B", score: 54 },
  { id: 2, title: "Muscle tissue", score: 62 },
  { id: 3, title: "Nephrolothiasis", score: 68 },
  { id: 4, title: "Disorders of sex development", score: 71 },
  { id: 5, title: "Cardiovascular system", score: 75 },
  { id: 6, title: "Respiratory physiology", score: 77 },
  { id: 7, title: "Endocrine system", score: 80 },
].sort((a, b) => a.score - b.score);

const calculateArc = (percentage: number, radius: number = 20) => {
  // Start from top (12 o'clock) which is -90 degrees in SVG
  const startAngle = -90;
  const endAngle = (percentage / 100 * 360) - 90;
  
  // Calculate start and end points
  const x1 = 24 + radius * Math.cos((startAngle * Math.PI) / 180);
  const y1 = 24 + radius * Math.sin((startAngle * Math.PI) / 180);
  const x2 = 24 + radius * Math.cos((endAngle * Math.PI) / 180);
  const y2 = 24 + radius * Math.sin((endAngle * Math.PI) / 180);
  
  // Determine if we need the large arc flag
  const largeArcFlag = percentage > 50 ? 1 : 0;
  
  return {
    green: `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    red: `M ${x2} ${y2} A ${radius} ${radius} 0 ${1 - largeArcFlag} 1 ${x1} ${y1}`
  };
};

const TopicsList = () => {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">High-Yield Topics To Focus On</h2>
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
            className="border rounded-lg p-4 hover:border-blue-200 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Book className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{topic.title}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">{topic.score}%</span>
                  </div>
                  <svg className="w-12 h-12">
                    <path
                      d={calculateArc(topic.score).green}
                      className="text-green-400"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      strokeLinecap="butt"
                    />
                    <path
                      d={calculateArc(topic.score).red}
                      className="text-red-700"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      strokeLinecap="butt"
                    />
                  </svg>
                </div>
                {expandedTopic === topic.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            {expandedTopic === topic.id && (
              <div className="mt-4 pl-8 text-gray-600 animate-fadeIn">
                <p>Additional details about {topic.title} would go here.</p>
                <div className="mt-2 flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                    Read Article
                  </button>
                  <button className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
                    Practice Questions
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
