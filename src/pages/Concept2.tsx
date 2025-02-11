
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
            <div className="relative w-80 h-60">
              <svg viewBox="0 0 512 512" className="w-full h-full">
                <g id="dial">
                  <g>
                    {/* Yellow Center Section */}
                    <path className="fill-[#FFDD19]" d="M261.2,113c9.2,0,18,1.5,26.2,4.2l7.4-22.8C284.3,90.9,273,89,261.2,89c-11.7,0-23,1.9-33.6,5.3l7.4,22.8C243.3,114.5,252.1,113,261.2,113z"/>
                    
                    {/* Green Right Section */}
                    <path className="fill-[#8DC641]" d="M329.9,148l19.4-14.1c-13.4-18.4-32.4-32.4-54.4-39.6l-7.4,22.8C304.6,122.8,319.4,133.7,329.9,148z"/>
                    
                    {/* Red Left Section */}
                    <path className="fill-[#ED1B24]" d="M173.2,133.9c-13.1,18-20.8,40.1-20.8,64h24c0-18.6,6-35.9,16.3-49.9L173.2,133.9z"/>
                    
                    {/* Orange Section */}
                    <path className="fill-[#F46523]" d="M235,117.2l-7.4-22.8c-22,7.2-41,21.2-54.4,39.6l19.4,14.1C203,133.7,217.8,122.8,235,117.2z"/>
                    
                    {/* Dark Green Right Edge */}
                    <path className="fill-[#019444]" d="M349.3,133.9L329.9,148c10.2,14,16.3,31.2,16.3,49.9h24C370.1,174,362.4,151.9,349.3,133.9z"/>
                    
                    {/* Gray Sections */}
                    <polygon className="fill-[#C4C4C4]" points="152.3,197.9 176.3,197.9 176.3,197.9 152.3,197.9"/>
                    <polygon className="fill-[#C4C4C4]" points="346.1,197.9 346.1,197.9 370.1,197.9 370.1,197.9"/>
                    
                    {/* Empty Fill Sections */}
                    <path className="fill-none" d="M287.5,117.2l-26.2,80.7l68.6-49.9C319.4,133.7,304.6,122.8,287.5,117.2z"/>
                    <path className="fill-none" d="M261.2,113c-9.2,0-18,1.5-26.2,4.2l26.2,80.7l26.2-80.7C279.2,114.5,270.4,113,261.2,113z"/>
                    <path className="fill-none" d="M192.6,148l68.6,49.9L235,117.2C217.8,122.8,203,133.7,192.6,148z"/>
                    <path className="fill-none" d="M176.3,197.9h84.9L192.6,148C182.4,162.1,176.3,179.3,176.3,197.9z"/>
                    <path className="fill-none" d="M261.2,197.9h84.9c0-18.6-6-35.9-16.3-49.9L261.2,197.9z"/>
                  </g>
                  
                  {/* Needle */}
                  <g transform={`rotate(${calculateRotation(score)} 261.2 197.9)`}>
                    <polyline points="265.9,190.5 269.4,178.8 261.2,94.4 253.1,178.8 256.6,190.5" className="fill-gray-800"/>
                    <path className="fill-gray-800" d="M261.2,187.7c-5.6,0-10.2,4.6-10.2,10.2c0,5.6,4.6,10.2,10.2,10.2s10.2-4.6,10.2-10.2C271.4,192.3,266.9,187.7,261.2,187.7z M261.2,203.2c-2.9,0-5.3-2.4-5.3-5.3s2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3S264.2,203.2,261.2,203.2z"/>
                  </g>
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
