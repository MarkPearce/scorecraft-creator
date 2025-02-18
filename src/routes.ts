
interface RouteConfig {
  path: string;
  label: string;
  element: () => JSX.Element;
  description?: string;
  isVisible?: boolean;
}

import Index from "./pages/Index";
import Report from "./pages/Report";
import TopicBreakdown from "./pages/TopicBreakdown";
import SinglePageReport from "./pages/SinglePageReport";
import NotFound from "./pages/NotFound";

export const routes: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    element: Index,
    description: "Main dashboard view",
    isVisible: true
  },
  {
    path: "/report",
    label: "Report",
    element: Report,
    description: "View detailed performance report",
    isVisible: true
  },
  {
    path: "/topic-breakdown",
    label: "Topic Breakdown",
    element: TopicBreakdown,
    description: "Detailed breakdown by topic",
    isVisible: true
  },
  {
    path: "/single-page-report",
    label: "Single Page Report",
    element: SinglePageReport,
    description: "Consolidated single page report view",
    isVisible: true
  },
  {
    path: "*",
    label: "Not Found",
    element: NotFound,
    description: "404 page",
    isVisible: false
  },
];

// Expose routes to window object for Lovable editor
declare global {
  interface Window {
    __LOVABLE_ROUTES__: typeof routes;
  }
}

window.__LOVABLE_ROUTES__ = routes;
