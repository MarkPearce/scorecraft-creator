
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Performance Gauge</h1>
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

            {/* Gauge */}
            <div className="relative w-64 h-32 mt-8">
              {/* Gauge Background */}
              <div className="absolute w-full h-full">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Red Section */}
                  <path
                    d="M20 90 A 70 70 0 0 1 60 30"
                    fill="none"
                    stroke="#ea384c"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Orange Section */}
                  <path
                    d="M60 30 A 70 70 0 0 1 100 20"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Yellow Section */}
                  <path
                    d="M100 20 A 70 70 0 0 1 140 30"
                    fill="none"
                    stroke="#FEF7CD"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Green Section */}
                  <path
                    d="M140 30 A 70 70 0 0 1 180 90"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  
                  {/* Needle */}
                  <g transform={`rotate(${calculateRotation(score)} 100 90)`}>
                    <line
                      x1="100"
                      y1="90"
                      x2="100"
                      y2="30"
                      stroke="#333333"
                      strokeWidth="2"
                    />
                    <circle cx="100" cy="90" r="5" fill="#333333" />
                  </g>
                </svg>
              </div>
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
