
import { DataPoint } from './types';

export const getStrokeColor = (score: number, examStep: 'step1' | 'step2') => {
  if (examStep === 'step1') {
    if (score >= 231) return '#22c55e';
    if (score >= 196) return '#F97316';
    return '#ea384c';
  } else {
    if (score >= 265) return '#019444';
    if (score >= 249) return '#22c55e';
    if (score >= 214) return '#F97316';
    return '#ea384c';
  }
};

export const generateIntermediatePoints = (start: DataPoint, end: DataPoint, examStep: 'step1' | 'step2'): DataPoint[] => {
  const points: DataPoint[] = [];
  const numPoints = Math.floor(Math.random() * 3) + 2; // Generate 2-4 points
  
  for (let i = 1; i <= numPoints; i++) {
    const progress = i / (numPoints + 1); // This ensures even spacing
    const baseScore = start.score + (end.score - start.score) * progress;
    const variation = Math.random() * 6 - 3; // Add random variation of ±3 points
    const score = Math.round(baseScore + variation);
    
    points.push({
      date: '',
      score,
      color: getStrokeColor(score, examStep),
      isMainPoint: false
    });
  }
  
  return points;
};
