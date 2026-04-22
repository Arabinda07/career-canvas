import { Link } from "react-router-dom";
import { Brain, UserCheck } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-4 italic uppercase">
          Discover Your<br />True Potential
        </h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
          Take our comprehensive psychometric evaluation based on RIASEC and Big Five 
          frameworks to find the perfect career and educational paths for you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mt-12 text-left">
        <div className="bg-white p-6 border-2 border-slate-900 border-r-8 border-b-8 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-6">
             <div className="bg-slate-900 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">Student</div>
             <div className="text-slate-300">01</div>
          </div>
          <h2 className="text-xl font-black uppercase mb-4">For Students</h2>
          <p className="text-[10px] text-slate-500 mb-8 font-bold uppercase tracking-widest leading-relaxed">
            Access your evaluation, view personalized reports, and uncover your strengths.
            Join with a class code or purchase an individual test.
          </p>
          <Link 
            to="/auth?role=student"
            className="mt-auto block w-full py-4 text-center bg-blue-600 text-white border-2 border-slate-900 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors"
          >
            Student Portal
          </Link>
        </div>

        <div className="bg-white p-6 border-2 border-slate-900 border-r-8 border-b-8 flex flex-col hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-6">
             <div className="bg-slate-900 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">Counselor</div>
             <div className="text-slate-300">02</div>
          </div>
          <h2 className="text-xl font-black uppercase mb-4">For Counselors</h2>
          <p className="text-[10px] text-slate-500 mb-8 font-bold uppercase tracking-widest leading-relaxed">
            Register your institution, manage student access codes, and track class-wide
            psychometric evaluation results.
          </p>
          <Link 
            to="/auth?role=counselor"
            className="mt-auto block w-full py-4 text-center bg-amber-400 text-slate-900 border-2 border-slate-900 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-colors"
          >
            Counselor Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
