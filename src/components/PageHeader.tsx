
import { Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
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
          <div className="flex-1 flex items-center relative bg-gray-50 rounded-full border border-gray-200">
            <Search className="ml-3 [&_svg]:size-5 text-gray-500" />
            <Input 
              className="border-0 bg-transparent pl-2 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search the AMBOSS library"
            />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center justify-center gap-1 mr-4 font-mono text-[10px] font-medium text-gray-600">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <RadioGroup defaultValue="step1" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="step1" id="step1" />
              <Label htmlFor="step1" className="text-sm font-medium">USMLE Step 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="step2" id="step2" />
              <Label htmlFor="step2" className="text-sm font-medium">USMLE Step 2</Label>
            </div>
          </RadioGroup>

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
