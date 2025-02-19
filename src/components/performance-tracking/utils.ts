
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
  const numPoints = Math.floor(Math.random() * 5) + 1; // Generate 1-5 points
  
  for (let i = 0; i < numPoints; i++) {
    // Random progress between 0 and 1 for uneven distribution
    const progress = Math.random();
    const baseScore = start.score + (end.score - start.score) * progress;
    const variation = Math.random() * 10 - 5; // Add random variation of ±5 points
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
