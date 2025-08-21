"use client"
import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="h-14 flex items-center justify-between px-4">
        <button 
          onClick={onMenuClick}
          className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/5 outline outline-1 outline-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-indigo-500/20 ring-1 ring-indigo-400/30 flex items-center justify-center">
            <span className="text-indigo-300 text-sm font-semibold tracking-tight">FH</span>
          </div>
          <span className="text-[13px] text-neutral-300">Financial Hub</span>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" 
          alt="Alex Morgan"
          className="h-8 w-8 rounded-full ring-1 ring-white/10 object-cover" 
        />
      </div>
    </div>
  );
}
