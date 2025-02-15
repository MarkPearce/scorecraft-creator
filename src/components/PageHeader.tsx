
import { Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import AmbossLogo from "./AmbossLogo";

export function PageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between gap-4 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
          <AmbossLogo />
        </div>

        <div className="flex-1 max-w-xl flex items-center gap-6">
          <Select>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="STUDENT" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">STUDENT</SelectItem>
              <SelectItem value="faculty">FACULTY</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              className="w-full pl-10 h-9"
              placeholder="Search the AMBOSS library"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-50 px-1.5 font-mono text-[10px] font-medium text-gray-600">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full"
          >
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
