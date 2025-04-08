
export type ExamStep = 'step1' | 'step2';

export interface ScoreRange {
  min: number;
  max: number;
}

export interface PerformanceGraphProps {
  score: number;
  targetScore: number;
  range: ScoreRange;
  examStep?: ExamStep;
  passingStandard?: number;
}

export interface ScoreSegment {
  score: number;
  color?: string;
  label: string;
}
