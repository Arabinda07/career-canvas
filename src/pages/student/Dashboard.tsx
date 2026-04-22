import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Ticket, 
  FileText, 
  Pulse, 
  ArrowRight, 
  Clock, 
  Star,
  User,
  ChartBar
} from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function StudentDashboard() {
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const completedTests = [
    { id: 1, title: "Psychometric Analysis", date: "oct 12, 2026", status: "finalized", score: "92%" }
  ];

  const handleStartExamWithCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'classCode', value: classCode })
      });
      const data = await res.json();
      
      if (data.isValid) {
        navigate("/student/exam?code=" + classCode);
      } else {
        alert("Invalid Access Code. Please use format: FC-XXX-2026-X");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-charcoal-ink/5 pb-10 gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-charcoal-ink text-white rounded-2xl flex items-center justify-center">
                <User weight="bold" size={24} />
             </div>
             <div>
                <span className="text-[10px] font-display font-black uppercase text-muted-slate tracking-[3px] block">subject identifier</span>
                <span className="text-lg font-display font-black uppercase italic">Alex Newman</span>
             </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase italic leading-[0.85]">
            cognitive <span className="text-electric-blue">journey.</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-display font-black italic">01</span>
            <span className="text-[9px] font-display font-black uppercase tracking-widest text-muted-slate">Reports</span>
          </div>
          <div className="w-px h-10 bg-charcoal-ink/10" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-display font-black italic text-emerald-signal">A+</span>
            <span className="text-[9px] font-display font-black uppercase tracking-widest text-muted-slate">Standing</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Entrance Card: Code */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 taste-card !border-charcoal-ink/10"
        >
          <div className="flex justify-between items-start mb-12">
            <div className="p-4 bg-canvas-white rounded-2xl border border-charcoal-ink/5">
              <Ticket weight="bold" size={32} className="text-electric-blue" />
            </div>
          </div>
          <div className="max-w-xl">
            <h2 className="text-3xl font-display font-black uppercase mb-6 tracking-tighter italic leading-none">Enter Access Code</h2>
            <p className="text-steel-secondary mb-10 text-base lowercase leading-relaxed">
              Assigned an institutional identifier? Provide your cryptographic class code to initialize your psychometric evaluation flow.
            </p>
          </div>
          
          <form onSubmit={handleStartExamWithCode} className="flex flex-col sm:flex-row gap-6">
            <input 
              type="text" 
              placeholder="E.G. FC-KVS-2026-X"
              className="taste-input !rounded-2xl !py-6"
              value={classCode}
              onChange={e => setClassCode(e.target.value.toUpperCase())}
              required
            />
            <button 
              type="submit"
              disabled={loading || !classCode}
              className="taste-button-primary !px-12"
            >
              {loading ? 'Initializing...' : 'Begin Protocol'}
            </button>
          </form>
        </motion.div>

        {/* Quick Action Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 bg-charcoal-ink text-pure-surface p-14 rounded-[2rem] flex flex-col"
        >
          <div className="p-4 bg-white/10 rounded-2xl w-fit mb-10">
            <Pulse weight="bold" size={32} className="text-electric-blue" />
          </div>
          <h2 className="text-3xl font-display font-black uppercase mb-6 tracking-tighter italic leading-none">Start Fresh</h2>
          <p className="text-muted-slate mb-10 text-base lowercase leading-relaxed">
            Acquire a new evaluation license immediately via secure individual payment.
          </p>
          
          <Link 
            to="/start-assessment"
            className="mt-auto taste-button-primary !bg-white !text-charcoal-ink hover:!bg-electric-blue hover:!text-white"
          >
            New Assessment <ArrowRight weight="bold" />
          </Link>
        </motion.div>

      </div>

      <div className="pt-20">
        <div className="mb-16 underline underline-offset-8 decoration-charcoal-ink/10">
          <h2 className="text-4xl font-display font-black uppercase tracking-tighter italic">Validated Records.</h2>
        </div>
        
        <div className="grid gap-8">
           {completedTests.map((t) => (
             <motion.div 
               key={t.id}
               whileHover={{ y: -5 }}
               className="taste-card !p-12 !rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-12 group border-charcoal-ink/5 hover:border-electric-blue/20 transition-all duration-500"
             >
               <div className="flex items-center gap-10">
                  <div className="w-20 h-20 bg-canvas-white rounded-3xl flex items-center justify-center border border-charcoal-ink/5 group-hover:bg-charcoal-ink group-hover:text-white transition-all duration-500">
                     <FileText weight="bold" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tighter group-hover:text-electric-blue transition-colors italic">{t.title}</h3>
                    <div className="flex items-center gap-6 mt-2">
                       <span className="text-[9px] font-display font-black text-muted-slate uppercase tracking-widest flex items-center gap-2">
                          <Clock weight="bold" /> {t.date}
                       </span>
                       <span className="text-[9px] font-display font-black text-emerald-signal uppercase tracking-widest flex items-center gap-2">
                          <Pulse weight="bold" /> {t.status}
                       </span>
                    </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-10">
                  <div className="text-right hidden sm:block">
                     <span className="text-[9px] font-display font-black uppercase tracking-widest text-muted-slate block mb-1">consistency</span>
                     <span className="text-2xl font-display font-black italic">{t.score}</span>
                  </div>
                  <Link 
                    to="/student/report" 
                    className="taste-button-primary !py-5 !px-10 !text-xs"
                  >
                    Analysis <ChartBar weight="bold" className="ml-2" />
                  </Link>
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </main>
  );
}
