import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AmbossLogo from "@/components/AmbossLogo";
const Landing = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <AmbossLogo />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Continuous Assessment User Test
          </h1>
        </div>

        <div className="max-w-sm mx-auto">
          <Button variant="default" onClick={() => navigate("/report")} className="py-px px-5">
            Start prototype
          </Button>
        </div>
      </div>
    </div>;
};
export default Landing;