
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center px-4 h-14">
        <Button variant="ghost" size="icon" className="mr-4 md:hidden">
          <Menu className="h-5 w-5 text-gray-500" />
        </Button>
        
        <div className="flex items-center gap-8">
          <img src="/logo.svg" alt="Logo" className="h-5" />
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              STUDENT
            </Button>
          </div>
        </div>

        <div className="relative flex flex-1 max-w-2xl mx-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="search"
              placeholder="Search the AMBOSS library"
              className="w-full pl-10 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">⌘+K</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
