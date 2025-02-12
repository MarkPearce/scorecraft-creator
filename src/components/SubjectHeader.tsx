
import { LucideIcon } from "lucide-react";

interface SubjectHeaderProps {
  subject: string;
  examWeight?: string;
  icon: LucideIcon;
  iconColor: string;
}

export const SubjectHeader = ({ subject, examWeight, icon: Icon, iconColor }: SubjectHeaderProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <div className="flex items-center space-x-2">
        <span className="font-medium">{subject}</span>
        {examWeight && (
          <span className="text-xs text-[#8A898C]">
            ({examWeight}%)
          </span>
        )}
      </div>
    </div>
  );
};
