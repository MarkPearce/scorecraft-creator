
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Concept2 = () => {
  const navigate = useNavigate();
  const [score] = useState(249);
  const [range] = useState({ min: 241, max: 257 });

  // Calculate rotation based on score (assuming 0-300 range)
  const calculateRotation = (score: number) => {
    const minAngle = -90; // Start angle
    const maxAngle = 90; // End angle
    const percentage = (score / 300) * 100;
    return minAngle + ((maxAngle - minAngle) * percentage) / 100;
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

          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Score Display */}
            <div className="bg-[#F0FBFA] p-6 rounded-lg w-full max-w-md">
              <div className="text-center">
                <div className="text-6xl font-bold text-emerald-700">{score}</div>
                <div className="text-gray-600 mt-2">
                  RANGE {range.min}-{range.max}
                </div>
              </div>
            </div>

            {/* Enhanced Gauge */}
            <div className="relative w-full max-w-md aspect-[2/1]">
              <svg viewBox="0 0 512 300" className="w-full h-full">
                <g id="dial">
                  <g>
                    {/* Empty Fill Sections */}
                    <path className="fill-none" d="M317.7,68.2L256,257.9l161.4-117.2C392.8,107,358.1,81.3,317.7,68.2z"/>
                    <path className="fill-none" d="M256,58.4c-21.5,0-42.2,3.5-61.7,9.8L256,257.9l61.7-189.8C298.2,61.8,277.5,58.4,256,58.4z"/>
                    <path className="fill-none" d="M94.6,140.7L256,257.9L194.3,68.2C153.9,81.3,119.2,107,94.6,140.7z"/>
                    <path className="fill-none" d="M56.4,257.9H256L94.6,140.7C70.6,173.6,56.4,214.2,56.4,257.9z"/>
                    <path className="fill-none" d="M256,257.9h199.6c0-43.8-14.2-84.3-38.2-117.2L256,257.9z"/>
                    
                    {/* Yellow Center Section */}
                    <path className="fill-[#FFDD19]" d="M256,58.4c21.5,0,42.2,3.5,61.7,9.8l17.4-53.7C310.2,6.4,283.6,1.9,256,1.9c-27.6,0-54.2,4.4-79.1,12.5l17.4,53.7C213.8,61.8,234.5,58.4,256,58.4z"/>
                    
                    {/* Gray Sections */}
                    <polygon className="fill-[#C4C4C4]" points="0,257.9 56.4,257.9 56.4,257.9 0,257.9"/>
                    <polygon className="fill-[#C4C4C4]" points="455.6,257.9 455.6,257.9 512,257.9 512,257.9"/>
                    
                    {/* Green Right Section */}
                    <path className="fill-[#8DC641]" d="M417.4,140.7l45.7-33.2c-31.5-43.2-76.1-76.2-127.9-93.1l-17.4,53.7C358.1,81.3,392.8,107,417.4,140.7z"/>
                    
                    {/* Red Left Section */}
                    <path className="fill-[#ED1B24]" d="M49,107.5C18.2,149.8,0,201.8,0,257.9h56.4c0-43.8,14.2-84.3,38.2-117.2L49,107.5z"/>
                    
                    {/* Orange Section */}
                    <path className="fill-[#F46523]" d="M194.3,68.2l-17.4-53.7C125.1,31.4,80.4,64.4,49,107.5l45.7,33.2C119.2,107,153.9,81.3,194.3,68.2z"/>
                    
                    {/* Dark Green Right Edge */}
                    <path className="fill-[#019444]" d="M463,107.5l-45.7,33.2c24,32.9,38.2,73.5,38.2,117.2H512C512,201.8,493.8,149.8,463,107.5z"/>
                  </g>
                  
                  {/* Needle */}
                  <g transform={`rotate(${calculateRotation(score)} 256 257.9)`}>
                    <polyline points="266.9,240.5 275.2,212.9 256,14.5 236.8,212.9 245.1,240.5" className="fill-gray-800"/>
                    <path className="fill-gray-800" d="M256,233.9c-13.3,0-24,10.7-24,24c0,13.3,10.7,24,24,24c13.3,0,24-10.7,24-24C280,244.7,269.3,233.9,256,233.9z M256,270.5c-6.9,0-12.5-5.6-12.5-12.5s5.6-12.5,12.5-12.5c6.9,0,12.5,5.6,12.5,12.5S262.9,270.5,256,270.5z"/>
                  </g>
                  
                  {/* Empty arc path */}
                  <path className="fill-none" d="M166,257.9c0-49.7,40.3-90,90-90s90,40.3,90,90H166z"/>
                </g>
              </svg>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4 w-full max-w-md mt-8">
              <Button 
                onClick={() => navigate('/report')}
                variant="outline"
                className="w-full py-6 text-lg"
              >
                See full performance report
              </Button>
              <Button 
                className="w-full py-6 text-lg bg-[#06B6D4] hover:bg-[#06B6D4]/90"
              >
                Take another mini-assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concept2;
