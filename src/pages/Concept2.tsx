
import { Button } from "@/components/ui/button";
import { ArrowLeft, Angry, Frown, Meh, Smile, Laugh, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import PrototypeControls from "@/components/PrototypeControls";

const Concept2 = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(249);
  const [range, setRange] = useState({ min: 241, max: 257 });
  const [targetScore, setTargetScore] = useState(230);

  const getScoreLevelName = (score: number) => {
    if (score < 100) return "Critical";
    if (score < 150) return "Needs Work";
    if (score < 200) return "Developing";
    if (score < 250) return "Strong";
    return "Excellent";
  };

  const getScoreColor = (score: number) => {
    if (score < 100) return "text-[#ED1B24]";
    if (score < 150) return "text-[#F46523]";
    if (score < 200) return "text-[#FFDD19]";
    if (score < 250) return "text-[#8DC641]";
    return "text-[#019444]";
  };

  const getBackgroundColor = (score: number) => {
    if (score < 100) return "bg-[#ED1B24]/15";
    if (score < 150) return "bg-[#F46523]/15";
    if (score < 200) return "bg-[#FFDD19]/15";
    if (score < 250) return "bg-[#8DC641]/15";
    return "bg-[#019444]/15";
  };

  const getFaceIcon = (score: number) => {
    const colorClass = getScoreColor(score);
    if (score < 100) return <Angry className={`w-16 h-16 ${colorClass}`} />;
    if (score < 150) return <Frown className={`w-16 h-16 ${colorClass}`} />;
    if (score < 200) return <Meh className={`w-16 h-16 ${colorClass}`} />;
    if (score < 250) return <Smile className={`w-16 h-16 ${colorClass}`} />;
    if (score <= 300) return <Laugh className={`w-16 h-16 ${colorClass}`} />;
    return <AlertTriangle className={`w-16 h-16 ${colorClass}`} />;
  };

  const calculateRotation = (value: number) => {
    // Map 0-300 range to -90 to 90 degrees
    return ((value / 300) * 180) - 90;
  };

  const calculateTargetRotation = (value: number) => {
    // Map 0-300 range to -90 to 90 degrees
    return ((value / 300) * 180) - 90;
  };

  const handleRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    setRange(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Predicted Score</h1>
          </div>

          <div className={`${getBackgroundColor(score)} p-6 rounded-lg w-full max-w-md`}>
            <div className="flex items-center justify-center gap-6">
              {getFaceIcon(score)}
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-gray-600 mt-2">
                  RANGE {range.min}-{range.max}
                </div>
                <div className={`text-sm font-medium ${getScoreColor(score)} mt-1`}>
                  {getScoreLevelName(score)}
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-md aspect-[2/1]">
            <svg viewBox="0 0 512 300" className="w-full h-full">
              <g id="dial">
                <path className="fill-none" d="M317.7,68.2L256,257.9l161.4-117.2C392.8,107,358.1,81.3,317.7,68.2z"/>
                <path className="fill-none" d="M256,58.4c-21.5,0-42.2,3.5-61.7,9.8L256,257.9l61.7-189.8C298.2,61.8,277.5,58.4,256,58.4z"/>
                <path className="fill-none" d="M94.6,140.7L256,257.9L194.3,68.2C153.9,81.3,119.2,107,94.6,140.7z"/>
                <path className="fill-none" d="M56.4,257.9H256L94.6,140.7C70.6,173.6,56.4,214.2,56.4,257.9z"/>
                <path className="fill-none" d="M256,257.9h199.6c0-43.8-14.2-84.3-38.2-117.2L256,257.9z"/>
                
                <path className="fill-[#FFDD19]" d="M256,58.4c21.5,0,42.2,3.5,61.7,9.8l17.4-53.7C310.2,6.4,283.6,1.9,256,1.9c-27.6,0-54.2,4.4-79.1,12.5l17.4,53.7C213.8,61.8,234.5,58.4,256,58.4z"/>
                
                <polygon className="fill-[#C4C4C4]" points="0,257.9 56.4,257.9 56.4,257.9 0,257.9"/>
                <polygon className="fill-[#C4C4C4]" points="455.6,257.9 455.6,257.9 512,257.9 512,257.9"/>
                
                <path className="fill-[#8DC641]" d="M417.4,140.7l45.7-33.2c-31.5-43.2-76.1-76.2-127.9-93.1l-17.4,53.7C358.1,81.3,392.8,107,417.4,140.7z"/>
                
                <path className="fill-[#ED1B24]" d="M49,107.5C18.2,149.8,0,201.8,0,257.9h56.4c0-43.8,14.2-84.3,38.2-117.2L49,107.5z"/>
                
                <path className="fill-[#F46523]" d="M194.3,68.2l-17.4-53.7C125.1,31.4,80.4,64.4,49,107.5l45.7,33.2C119.2,107,153.9,81.3,194.3,68.2z"/>
                
                <path className="fill-[#019444]" d="M463,107.5l-45.7,33.2c24,32.9,38.2,73.5,38.2,117.2H512C512,201.8,493.8,149.8,463,107.5z"/>
                
                <g transform={`rotate(${calculateTargetRotation(targetScore)} 256 257.9)`}>
                  <line 
                    x1="256" 
                    y1="257.9" 
                    x2="256" 
                    y2="0" 
                    className="stroke-[#0EA5E9] stroke-[3] opacity-50"
                    strokeDasharray="4 4"
                  />
                </g>
                
                <g transform={`rotate(${calculateRotation(score)} 256 257.9)`}>
                  <polyline points="266.9,240.5 275.2,212.9 256,14.5 236.8,212.9 245.1,240.5" className="fill-gray-800"/>
                  <path className="fill-gray-800" d="M256,233.9c-13.3,0-24,10.7-24,24c0,13.3,10.7,24,24,24c13.3,0,24-10.7,24-24C280,244.7,269.3,233.9,256,233.9z M256,270.5c-6.9,0-12.5-5.6-12.5-12.5s5.6-12.5,12.5-12.5c6.9,0,12.5,5.6,12.5,12.5S262.9,270.5,256,270.5z"/>
                </g>
                
                <path className="fill-none" d="M166,257.9c0-49.7,40.3-90,90-90s90,40.3,90,90H166z"/>
              </g>
            </svg>
          </div>

          <PrototypeControls 
            range={range}
            targetScore={targetScore}
            score={score}
            onRangeChange={handleRangeChange}
            onTargetScoreChange={(value) => setTargetScore(value[0])}
            onScoreChange={(value) => setScore(value[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default Concept2;
