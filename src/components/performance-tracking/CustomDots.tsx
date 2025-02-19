
import { memo } from 'react';
import { DataPoint, DotProps } from './types';

const getDotColor = (score: number, examStep: 'step1' | 'step2'): string => {
  if (examStep === 'step2') {
    if (score >= 265) return '#019444'; // dark green
    if (score >= 249) return '#22c55e'; // light green
    if (score >= 214) return '#fbbf24'; // yellow - keeping #fbbf24 as #FFC205 isn't in our color system
    return '#ea384c'; // red
  } else {
    // Step 1 logic
    if (score >= 265) return '#019444'; // dark green
    if (score >= 231) return '#22c55e'; // light green - at or above national mean
    if (score >= 196) return '#fbbf24'; // yellow - at or above passing standard
    return '#ea384c'; // red - below passing standard
  }
};

export const CustomDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload, examStep = 'step2' } = props;
  if (!payload) return null;
  const radius = 6;  // All dots now have the same size since we only have main points
  const color = getDotColor(payload.score, examStep);
  return <circle cx={cx} cy={cy} r={radius} fill={color} />;
});
CustomDot.displayName = 'CustomDot';

export const CustomActiveDot = memo((props: DotProps) => {
  const { cx = 0, cy = 0, payload, examStep = 'step2' } = props;
  if (!payload) return null;
  const radius = 8;  // All active dots now have the same size
  const color = getDotColor(payload.score, examStep);
  return <circle cx={cx} cy={cy} r={radius} fill={color} />;
});
CustomActiveDot.displayName = 'CustomActiveDot';
