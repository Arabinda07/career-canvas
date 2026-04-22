import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/student/Dashboard";
import Exam from "./pages/student/Exam";
import Report from "./pages/student/Report";
import CounselorDashboard from "./pages/counselor/Dashboard";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100dvh] bg-slate-50 text-slate-900 font-sans flex flex-col border-8 border-slate-900 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/exam" element={<Exam />} />
              <Route path="/student/report" element={<Report />} />
              <Route path="/counselor" element={<CounselorDashboard />} />
            </Routes>
          </div>
        </main>
        
        <footer className="h-10 bg-slate-900 text-white flex items-center justify-between px-8 text-[10px] font-bold uppercase tracking-[0.2em] shrink-0">
          <div className="hidden md:flex gap-8">
            <span>Session: Alpha-01</span>
            <span>Latency: 24ms</span>
            <span>DB: Supabase_Postgres</span>
          </div>
          <div>© 2024 PsychMetric Global</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}