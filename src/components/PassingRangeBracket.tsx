
import React from 'react';

const PassingRangeBracket = () => {
  return (
    <div className="relative w-8 h-8 bg-red-200">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 32 102"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <path 
          d="M32 1H18.8C17.2 1 16 2.2 16 3.8v94.5c0 1.5 1.2 2.8 2.8 2.8H32" 
          className="fill-none stroke-gray-600" 
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path 
          d="M16 51H0" 
          className="fill-none stroke-gray-600" 
          strokeWidth="2.4528"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default PassingRangeBracket;
