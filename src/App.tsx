import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Sparkle } from "@phosphor-icons/react";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/student/Dashboard";
import Exam from "./pages/student/Exam";
import Report from "./pages/student/Report";
import CounselorDashboard from "./pages/counselor/Dashboard";
import RIASECGuide from "./pages/RIASECGuide";
import StartExam from "./pages/StartExam";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100dvh] bg-canvas-white text-charcoal-ink font-sans selection:bg-electric-blue selection:text-pure-surface overflow-x-hidden">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/science" element={<RIASECGuide />} />
            <Route path="/start-assessment" element={<StartExam />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/exam" element={<Exam />} />
            <Route path="/student/report" element={<Report />} />
            <Route path="/counselor" element={<CounselorDashboard />} />
          </Routes>
        </main>
        
        <footer className="bg-canvas-white border-t border-charcoal-ink/5 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-charcoal-ink rounded-lg flex items-center justify-center">
                  <Sparkle weight="fill" size={16} className="text-electric-blue" />
                </div>
                <span className="font-display font-black text-xl uppercase tracking-tighter italic">Future Canvas.</span>
              </div>
              <p className="text-xs text-muted-slate lowercase leading-relaxed max-w-[240px]">
                architecting psychometric pathways for the next generation of academic nodes.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-display font-black uppercase tracking-[3px] text-muted-slate/50">Frameworks</span>
                <div className="flex gap-4">
                  <Link to="/#about" className="text-[10px] font-display font-black uppercase tracking-widest text-charcoal-ink hover:text-electric-blue transition-colors italic">RIASEC</Link>
                  <Link to="/#about" className="text-[10px] font-display font-black uppercase tracking-widest text-charcoal-ink hover:text-electric-blue transition-colors italic">Big Five</Link>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-display font-black uppercase tracking-[3px] text-muted-slate/50">Connect</span>
                <div className="flex gap-4">
                  <a href="https://linkedin.com" className="text-[10px] font-display font-black uppercase tracking-widest text-charcoal-ink hover:text-electric-blue transition-colors italic">LinkedIn</a>
                  <a href="mailto:contact@futurecanvas.ai" className="text-[10px] font-display font-black uppercase tracking-widest text-charcoal-ink hover:text-electric-blue transition-colors italic">Protocol</a>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-display font-black uppercase tracking-[2px] text-muted-slate/30 italic">
                © 2026 Future Canvas Protocol · deployed via pm shri programs.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
