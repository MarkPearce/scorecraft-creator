
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
              <svg viewBox="0 0 200 160" className="w-full h-full">
                <defs>
                  <radialGradient id="gaugeGradient" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Single gradient arc */}
                <path
                  d="M 40 80 A 60 60 0 0 1 160 80"
                  fill="none"
                  stroke="url(#conicGradient)"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  style={{
                    stroke: `conic-gradient(from 180deg at 50% 50%, 
                      #ed1b24 0%, 
                      #f46523 20%, 
                      #ffdd19 40%, 
                      #8dc641 60%, 
                      #019444 80%
                    )`
                  }}
                  className="opacity-90"
                />

                {/* Center white circle */}
                <circle cx="100" cy="80" r="40" fill="white" stroke="#e5e7eb" strokeWidth="1"/>

                {/* Needle */}
                <g transform={`rotate(${calculateRotation(score)} 100 80)`}>
                  <path
                    d="M 96 80 L 100 45 L 104 80 Z"
                    fill="#1f2937"
                  />
                  <circle cx="100" cy="80" r="4" fill="#1f2937"/>
                </g>

                {/* Emoji faces */}
                <g transform="translate(0, 120)">
                  {/* Very Sad */}
                  <circle cx="40" cy="0" r="12" fill="#ed1b24" className="opacity-90"/>
                  <path d="M 34 4 A 8 8 0 0 0 46 4" stroke="white" fill="none" strokeWidth="2"/>
                  <circle cx="35" cy="-3" r="2" fill="white"/>
                  <circle cx="45" cy="-3" r="2" fill="white"/>

                  {/* Sad */}
                  <circle cx="80" cy="0" r="12" fill="#f46523" className="opacity-90"/>
                  <path d="M 74 3 A 6 6 0 0 0 86 3" stroke="white" fill="none" strokeWidth="2"/>
                  <circle cx="75" cy="-3" r="2" fill="white"/>
                  <circle cx="85" cy="-3" r="2" fill="white"/>

                  {/* Neutral */}
                  <circle cx="120" cy="0" r="12" fill="#ffdd19" className="opacity-90"/>
                  <line x1="114" y1="2" x2="126" y2="2" stroke="white" strokeWidth="2"/>
                  <circle cx="115" cy="-3" r="2" fill="white"/>
                  <circle cx="125" cy="-3" r="2" fill="white"/>

                  {/* Happy */}
                  <circle cx="160" cy="0" r="12" fill="#019444" className="opacity-90"/>
                  <path d="M 154 0 A 6 6 0 0 1 166 0" stroke="white" fill="none" strokeWidth="2"/>
                  <circle cx="155" cy="-3" r="2" fill="white"/>
                  <circle cx="165" cy="-3" r="2" fill="white"/>
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
