
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AmbossLogo from "@/components/AmbossLogo";

const Landing = () => {
  const navigate = useNavigate();

  return <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Continuous Assessment User Test
          </h1>
          <div className="flex justify-center mb-12">
            <AmbossLogo />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Button 
            variant="outline" 
            className="w-full h-24 text-lg font-medium hover:bg-gray-200" 
            onClick={() => navigate("/report")}
          >
            Start prototype
          </Button>
        </div>
      </div>
    </div>;
};

export default Landing;
