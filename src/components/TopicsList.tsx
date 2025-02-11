
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
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      className="text-red-200"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="20"
                      cx="24"
                      cy="24"
                    />
                    <circle
                      className="text-green-500"
                      strokeWidth="3"
                      strokeDasharray={100}
                      strokeDashoffset={100 - topic.score}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="20"
                      cx="24"
                      cy="24"
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
