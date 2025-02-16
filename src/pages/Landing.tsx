
import { PageHeader } from "@/components/PageHeader";
import ProgressTracker from "@/components/ProgressTracker";

const Landing = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <ProgressTracker />
        </div>
      </div>
    </>
  );
};

export default Landing;
