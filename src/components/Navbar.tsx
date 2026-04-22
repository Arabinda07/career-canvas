import { Link, useLocation } from "react-router-dom";
import { Sparkle } from "@phosphor-icons/react";

export default function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";
  
  if (isAuthPage) return null;

  return (
    <nav className="h-20 bg-canvas-white flex items-center transition-all duration-700 border-b border-charcoal-ink/5">
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-charcoal-ink rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
            <Sparkle weight="fill" size={20} className="text-electric-blue" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl italic tracking-tighter leading-none text-charcoal-ink">Future Canvas.</span>
            <span className="text-[9px] font-display font-black tracking-[4px] text-muted-slate uppercase italic">Career Protocol V3</span>
          </div>
        </Link>
        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/science" className="text-[9px] uppercase tracking-[3px] font-display font-black text-muted-slate hover:text-electric-blue transition-all italic">The Science</Link>
            <Link to="/#about" className="text-[9px] uppercase tracking-[3px] font-display font-black text-muted-slate hover:text-electric-blue transition-all italic">The Framework</Link>
          </div>
          <div className="h-6 w-[1px] bg-charcoal-ink/10 hidden md:block" />
          <div className="flex items-center gap-6">
            <Link to="/auth?role=student" className="hidden sm:block text-[9px] uppercase font-display font-black tracking-[3px] text-muted-slate hover:text-charcoal-ink italic">Login</Link>
            <Link to="/start-assessment" className="taste-button-primary !px-6 !py-3 !text-[9px] tracking-[4px]">
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
