
export interface PerformanceRange {
  min: number;
  max: number;
}

export interface ScoreSegment {
  score: number;
  color?: string;
  label: string;
}

export type ExamStep = 'step1' | 'step2';

export interface PerformanceGraphProps {
  score: number;
  targetScore: number;
  range: PerformanceRange;
  examStep?: ExamStep;
  passingStandard?: number;
}
