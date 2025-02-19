
import { memo } from 'react';
import { DotProps } from './types';

export const CustomDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={payload.isMainPoint ? 6 : 3} 
      fill={payload.color} 
    />
  );
});
CustomDot.displayName = 'CustomDot';

export const CustomActiveDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={payload.isMainPoint ? 8 : 4} 
      fill={payload.color} 
    />
  );
});
CustomActiveDot.displayName = 'CustomActiveDot';
