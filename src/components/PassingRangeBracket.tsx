
import React from 'react';

const PassingRangeBracket = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 102"
      width="32"
      height="50"
      className="block"
    >
      <path 
        id="bracket"
        d="M32 1H18.8C17.2 1 16 2.2 16 3.8v42.5c0 1.5 1.2 2.8 2.8 2.8H32" 
        className="fill-none stroke-gray-600" 
        strokeWidth="2"
        strokeMiterlimit="10"
        vectorEffect="non-scaling-stroke"
      />
      <path 
        id="nib"
        d="M16 24H0" 
        className="fill-none stroke-gray-600" 
        strokeWidth="2.4528"
        strokeMiterlimit="10"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default PassingRangeBracket;
