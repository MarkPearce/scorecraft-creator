
// Main component exports
export { default as SinglePageReport } from './SinglePageReport';
export { default as PerformanceScoreCard } from './components/PerformanceScoreCard';
export { default as PerformanceTrackingContainer } from './components/PerformanceTrackingContainer';
export { default as PerformanceSummary } from './components/PerformanceSummary';
export { default as OverallPerformance } from './components/OverallPerformance';

// Supporting components exports
export { default as PerformanceGraph } from './components/PerformanceGraph';
export { default as ScoreIndicator } from './components/ScoreIndicator';

// Types export
export * from './components/performance/types';

// Note: This export package doesn't include shadcn/ui components.
// Make sure your project has shadcn/ui installed and properly configured.
// See README.md for more details on required dependencies.
