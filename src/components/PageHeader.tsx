
import { Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import AmbossLogo from "./AmbossLogo";

export function PageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between gap-4 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="shrink-0 [&_svg]:size-6">
            <Menu />
          </Button>
          <AmbossLogo />
          <div 
            className="w-[98px] h-[26px] border-none bg-blue-50 rounded-2xl font-lato text-[rgb(6,124,137)] text-xs font-bold tracking-[1px] flex items-center justify-center gap-1 uppercase antialiased leading-4"
            style={{
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              textSizeAdjust: '100%',
              unicodeBidi: 'isolate',
              whiteSpace: 'nowrap'
            }}
          >
            Student
            <ChevronDown className="w-5 h-5 stroke-[2px] text-[rgb(6,124,137)]" />
          </div>
        </div>

        <div className="flex-1 max-w-xl flex items-center gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 text-gray-500" />
            <Input 
              className="w-full pl-10 h-9 rounded-full bg-gray-50 border-gray-200"
              placeholder="Search the AMBOSS library"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="hidden sm:inline-flex h-5 select-none items-center justify-center gap-1 ml-2 font-mono text-[10px] font-medium text-gray-600">
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
              <AvatarFallback className="bg-[#24A3AA] text-white">U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
