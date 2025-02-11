
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, LayoutGrid } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Continuous Assessment User Test
          </h1>
          <p className="text-lg text-gray-600">
            Track your progress and master key concepts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button
            variant="outline"
            className="h-24 text-lg font-medium hover:bg-gray-100"
            onClick={() => navigate("/concept1")}
          >
            <LayoutGrid className="mr-2 h-5 w-5" />
            Line Chart
          </Button>

          <Button
            variant="outline"
            className="h-24 text-lg font-medium hover:bg-gray-100"
            onClick={() => navigate("/concept2")}
          >
            <LayoutGrid className="mr-2 h-5 w-5" />
            Performance Gauge
          </Button>

          <Button
            variant="outline"
            className="h-24 text-lg font-medium hover:bg-gray-100"
            onClick={() => navigate("/concept3")}
          >
            <LayoutGrid className="mr-2 h-5 w-5" />
            Exam Readiness
          </Button>

          <Button
            variant="outline"
            className="h-24 text-lg font-medium hover:bg-gray-100"
            onClick={() => navigate("/concept4")}
          >
            <LayoutGrid className="mr-2 h-5 w-5" />
            Performance Bar Chart
          </Button>

          <Button
            variant="outline"
            className="h-24 text-lg font-medium col-span-full hover:bg-gray-100"
            onClick={() => navigate("/report")}
          >
            <FileText className="mr-2 h-5 w-5" />
            Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
