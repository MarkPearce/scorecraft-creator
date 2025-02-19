
export interface DataPoint {
  date: string;
  score: number;
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
  examStep?: 'step1' | 'step2';
}

export interface PerformanceTrackingContainerProps {
  examStep?: 'step1' | 'step2';
}

export interface ReferenceLines {
  passing?: {
    value: number;
    label: string;
  };
  mean?: {
    value: number;
    label: string;
  };
  target?: {
    value: number;
    label: string;
  };
}
