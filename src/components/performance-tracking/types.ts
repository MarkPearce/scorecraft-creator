
export interface DataPoint {
  date: string;
  score: number;
  color: string;
  isMainPoint?: boolean;
}

export interface DotProps {
  cx?: number;
  cy?: number;
  r?: number;
  payload?: DataPoint;
  value?: number;
  index?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

export interface PerformanceTrackingContainerProps {
  examStep?: 'step1' | 'step2';
}
