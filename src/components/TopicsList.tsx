
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