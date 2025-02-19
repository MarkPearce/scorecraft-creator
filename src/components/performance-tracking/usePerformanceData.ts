
import { useMemo } from 'react';
import { DataPoint, ReferenceLines } from './types';

export const usePerformanceData = (examStep: 'step1' | 'step2' = 'step2') => {
  const data: DataPoint[] = useMemo(() => {
    const mainPoints = examStep === 'step1' ? [
      { date: 'Feb 12', score: 203, isMainPoint: true },
      { date: 'Feb 19', score: 218, isMainPoint: true },
      { date: 'Feb 26', score: 215, isMainPoint: true },
      { date: 'Mar 4', score: 235, isMainPoint: true },
      { date: 'Mar 11', score: 244, isMainPoint: true }
    ] : [
      { date: 'Feb 12', score: 198, isMainPoint: true },
      { date: 'Feb 19', score: 210, isMainPoint: true },
      { date: 'Feb 26', score: 203, isMainPoint: true },
      { date: 'Mar 4', score: 221, isMainPoint: true },
      { date: 'Mar 11', score: 227, isMainPoint: true }
    ];

    return mainPoints;
  }, [examStep]);

  const referenceLines: ReferenceLines = useMemo(() => {
    if (examStep === 'step1') {
      return {};
    }
    return {
      passing: {
        value: 214,
        label: 'Passing standard (214)'
      },
      mean: {
        value: 249,
        label: 'National mean (249)'
      },
      target: {
        value: 260,
        label: 'Target score (260)'
      }
    };
  }, [examStep]);

  return { data, referenceLines };
};
