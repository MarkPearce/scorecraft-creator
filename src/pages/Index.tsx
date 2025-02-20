
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AmbossLogo from "@/components/AmbossLogo";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <AmbossLogo />
          </div>
        </div>

        <div className="space-y-8">
          <ProgressTracker />
        </div>

        <div className="text-center text-sm text-gray-500 mt-12">
          © 2025 AMBOSS
        </div>
      </div>
    </div>;
};

export default Index;
