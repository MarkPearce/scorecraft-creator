
interface RouteConfig {
  path: string;
  label: string;
  element: () => JSX.Element;
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
  },
  {
    path: "/report",
    label: "Report",
    element: Report,
  },
  {
    path: "/topic-breakdown",
    label: "Topic Breakdown",
    element: TopicBreakdown,
  },
  {
    path: "/single-page-report",
    label: "Single Page Report",
    element: SinglePageReport,
  },
  {
    path: "*",
    label: "Not Found",
    element: NotFound,
  },
];
