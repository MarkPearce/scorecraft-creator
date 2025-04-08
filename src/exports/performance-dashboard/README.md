
# Performance Dashboard - Integration Guide

This package contains the USMLE Performance Dashboard components that can be integrated into any React application using TypeScript, Tailwind CSS, and shadcn/ui.

## Prerequisites

Your project should have:
- React 18+
- TypeScript 5.0+
- Tailwind CSS 3.0+
- shadcn/ui components
- Recharts library
- date-fns
- Lucide React icons

## Installation

1. Copy the entire `performance-dashboard` folder into your project's `src` directory, or place it in a location that matches your project structure.

2. Install any missing dependencies:
```bash
npm install recharts date-fns lucide-react
```

3. Make sure your project has shadcn/ui components installed. If not, follow the [shadcn/ui installation guide](https://ui.shadcn.com/docs/installation).

## Component Structure

The performance dashboard consists of the following main components:

- `SinglePageReport`: The main container component that combines all dashboard elements
- `PerformanceScoreCard`: Displays the current performance score with a visual graph
- `PerformanceTrackingContainer`: Shows performance trends over time
- `PerformanceSummary`: Displays strengths and weaknesses by topic
- `OverallPerformance`: Shows overall exam stats like questions answered and exam date

Supporting components:
- `PerformanceGraph`: Visualization of performance scores
- `ScoreIndicator`: Visual indicator for scores on graphs
- `GraphSegments`: Creates the segmented score visualization
- Various utility functions for score calculation and display

## Usage

Import and use the components in your React application:

```jsx
import { SinglePageReport } from './path/to/performance-dashboard';

function YourComponent() {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <SinglePageReport />
    </div>
  );
}
```

## Customization

### Data Integration

The dashboard is designed to work with USMLE exam performance data. To integrate your own data:

1. Modify the data sources in:
   - `PerformanceTrackingContainer.tsx` for time series data
   - `PerformanceTopicItem.tsx` for topic-based performance
   - `PerformanceScoreCard.tsx` for current scores and targets

2. Adjust the utility functions in `utils.ts` according to your scoring system.

### Styling

The dashboard uses Tailwind CSS for styling:

- Modify the colors in component files to match your application's theme
- Adjust sizing and spacing using Tailwind's utility classes

### Theming

To adapt the dashboard to your application's theme:

1. Update color values in the graph components
2. Modify the card styles in the component files

### Header Customization

The dashboard includes a header component (`PageHeader.tsx`). You can:

1. Replace it with your own application header
2. Remove it by modifying the `SinglePageReport.tsx` component

## Responsive Design

The dashboard is designed to be responsive across different screen sizes. The components use:

- Responsive grid layouts 
- Flexible width components
- Mobile-friendly interaction patterns

## Limitations and Considerations

- The dashboard is specifically designed for USMLE exam reporting. Some components may need modification for other types of assessments.
- The data visualization assumes a specific score range and benchmark system.

## Troubleshooting

Common issues:

- **Styling conflicts**: Ensure your Tailwind configuration includes all the used utility classes.
- **Missing icons**: Make sure Lucide React is installed and properly imported.
- **Chart rendering issues**: Check that Recharts is properly installed and your data format matches what the charts expect.

## License

This code is provided for integration purposes and should comply with your project's existing licensing.
