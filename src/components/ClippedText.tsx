
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip";

interface ClippedTextProps {
  text: string;
  className?: string;
}

const ClippedText = ({ text, className }: ClippedTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isClipped, setIsClipped] = useState(false);

  useEffect(() => {
    const checkIfClipped = () => {
      if (textRef.current) {
        setIsClipped(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkIfClipped();
    window.addEventListener('resize', checkIfClipped);
    
    return () => window.removeEventListener('resize', checkIfClipped);
  }, [text]);

  if (!isClipped) {
    return (
      <span 
        ref={textRef} 
        className={`overflow-hidden text-ellipsis whitespace-nowrap block ${className || ''}`}
      >
        {text}
      </span>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span 
            ref={textRef} 
            className={`overflow-hidden text-ellipsis whitespace-nowrap block ${className || ''}`}
          >
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ClippedText;

