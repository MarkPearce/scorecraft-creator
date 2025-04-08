
interface ScoreIndicatorProps {
  label: string;
  value: number;
}

const ScoreIndicator = ({ label, value }: ScoreIndicatorProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 inline-flex items-center gap-3 text-sm whitespace-nowrap">
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#cbd5e1]">
        <div className="w-3 h-3 rounded-full bg-[#0aa6b8]" />
      </div>
      <div>
        <div className="text-gray-500 text-xs">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
};

export default ScoreIndicator;
