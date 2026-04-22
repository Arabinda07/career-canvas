import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";
  
  if (isAuthPage) return null;

  return (
    <nav className="h-16 border-b-2 border-slate-900 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 border-2 border-slate-900 flex items-center justify-center">
             <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden sm:block">PsychMetric Pro</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-slate-900">
          <Link to="/auth?role=student" className="text-[10px] font-bold uppercase tracking-widest hover:text-blue-600">
            Student Login
          </Link>
          <Link to="/auth?role=counselor" className="bg-slate-900 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest border-2 border-slate-900 hover:bg-white hover:text-slate-900 transition-colors">
            Counselor Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
