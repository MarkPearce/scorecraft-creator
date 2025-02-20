
import React from 'react';

const PassingRangeBracket = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 128.68 49.23"
      className="h-full"
    >
      <g>
        <path 
          className="stroke-gray-600" 
          strokeWidth="2"
          strokeMiterlimit="10"
          fill="none"
          d="M128.68,1h-15.87c-1.1,0-2,.9-2,2v43.23c0,1.1.9,2,2,2h15.87"
        />
        <line 
          className="stroke-gray-600" 
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="110.81" 
          y1="24.62" 
          x2="100.17" 
          y2="24.62"
        />
      </g>
      <text 
        className="fill-gray-600 font-lato text-base"
        transform="translate(0 28.46)"
      >
        Passing range
      </text>
    </svg>
  );
};

export default PassingRangeBracket;
