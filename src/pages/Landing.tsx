
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AmbossLogo from "@/components/AmbossLogo";
import { PageHeader } from "@/components/PageHeader";
import ProgressTracker from "@/components/ProgressTracker";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <AmbossLogo />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Continuous Assessment User Test
            </h1>
            <Button variant="default" onClick={() => navigate("/report")} className="py-px px-5">
              Start prototype
            </Button>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <ProgressTracker />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
