
import { Card } from "@/components/ui/card";
import { PercentileDisplay } from "@/components/PercentileDisplay";

interface TextReadoutProps {
  percentile: number;
}

export const TextReadout = ({ percentile }: TextReadoutProps) => {
  return (
    <Card className="p-8 animate-fadeIn">
      <div className="space-y-6">
        <h2 className="text-gray-900 font-lato text-left text-xl font-bold">
          Text Projection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-left text-gray-600 font-lato">
            <p>
              You are currently at the {percentile}<sup>th</sup> percentile compared to other learners.
            </p>

            <p>
              On this percentile rank, learners usually end up scoring <span className="font-bold">230-250 on a 3-digit-scale</span>. Keep it up!
            </p>
          </div>
          
          <div>
            <PercentileDisplay percentile={percentile} />
          </div>
        </div>
      </div>
    </Card>
  );
};
